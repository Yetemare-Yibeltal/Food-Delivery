import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app';
import { env } from './config/env';
import { connectDatabase } from './config/database';
import { logger } from './config/logger';
import { APP_INFO, SOCKET_EVENTS } from '@yene/shared';

// ─── Create HTTP Server ───────────────────────────────────────────────────────
const httpServer = http.createServer(app);

// ─── Initialize Socket.io ─────────────────────────────────────────────────────
export const io = new SocketIOServer(httpServer, {
  cors: {
    origin: [env.FRONTEND_URL, env.APP_URL, 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
  pingTimeout: 60000,
  pingInterval: 25000,
});

// ─── Socket.io Connection Handler ────────────────────────────────────────────
io.on('connection', (socket) => {
  logger.info(`🔌 New socket connection: ${socket.id}`);

  // Join a room (order room, restaurant room, rider room)
  socket.on(SOCKET_EVENTS.JOIN_ROOM, (roomId: string) => {
    void socket.join(roomId);
    logger.debug(`Socket ${socket.id} joined room: ${roomId}`);
  });

  // Leave a room
  socket.on(SOCKET_EVENTS.LEAVE_ROOM, (roomId: string) => {
    void socket.leave(roomId);
    logger.debug(`Socket ${socket.id} left room: ${roomId}`);
  });

  // Rider location update
  socket.on(
    SOCKET_EVENTS.RIDER_LOCATION_UPDATE,
    (data: { orderId: string; lat: number; lng: number; heading?: number }) => {
      // Broadcast rider location to the customer's order room
      io.to(`order_${data.orderId}`).emit(SOCKET_EVENTS.RIDER_LOCATION_UPDATE, {
        lat: data.lat,
        lng: data.lng,
        heading: data.heading,
        updatedAt: new Date().toISOString(),
      });
    },
  );

  // Rider online status
  socket.on(SOCKET_EVENTS.RIDER_ONLINE, (riderId: string) => {
    void socket.join(`rider_${riderId}`);
    io.emit(SOCKET_EVENTS.RIDER_ONLINE, { riderId });
    logger.debug(`Rider ${riderId} is now online`);
  });

  // Rider offline status
  socket.on(SOCKET_EVENTS.RIDER_OFFLINE, (riderId: string) => {
    void socket.leave(`rider_${riderId}`);
    io.emit(SOCKET_EVENTS.RIDER_OFFLINE, { riderId });
    logger.debug(`Rider ${riderId} is now offline`);
  });

  // Handle disconnect
  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    logger.info(`🔌 Socket disconnected: ${socket.id}`);
  });

  // Handle connection errors
  socket.on('error', (error) => {
    logger.error(`Socket error for ${socket.id}:`, error);
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB first
    await connectDatabase();

    // Start HTTP server
    httpServer.listen(env.PORT, () => {
      logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      logger.info(`🚀 ${APP_INFO.NAME} API Server Started`);
      logger.info(`📍 Environment : ${env.NODE_ENV}`);
      logger.info(`🌐 Server URL  : ${env.API_URL}`);
      logger.info(`🔌 Port        : ${env.PORT}`);
      logger.info(`🗄️  Database    : MongoDB Connected`);
      logger.info(`🔴 Socket.io   : Real-time enabled`);
      logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// ─── Graceful Shutdown ────────────────────────────────────────────────────────
const gracefulShutdown = (signal: string): void => {
  logger.warn(`\n⚠️  Received ${signal}. Starting graceful shutdown...`);

  httpServer.close(async () => {
    logger.warn('✅ HTTP server closed');

    try {
      // Close Socket.io connections
      io.close(() => {
        logger.warn('✅ Socket.io server closed');
      });

      // Disconnect from MongoDB
      const mongoose = await import('mongoose');
      await mongoose.default.disconnect();
      logger.warn('✅ MongoDB connection closed');

      logger.warn('👋 Graceful shutdown complete');
      process.exit(0);
    } catch (error) {
      logger.error('❌ Error during graceful shutdown:', error);
      process.exit(1);
    }
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    logger.error('❌ Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
};

// ─── Process Signal Handlers ──────────────────────────────────────────────────
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// ─── Unhandled Promise Rejections ─────────────────────────────────────────────
process.on('unhandledRejection', (reason: unknown) => {
  logger.error('❌ Unhandled Promise Rejection:', reason);
  gracefulShutdown('unhandledRejection');
});

// ─── Uncaught Exceptions ──────────────────────────────────────────────────────
process.on('uncaughtException', (error: Error) => {
  logger.error('❌ Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

// ─── Start the Server ─────────────────────────────────────────────────────────
void startServer();

export default httpServer;
