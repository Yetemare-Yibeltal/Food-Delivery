import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import { logger, morganStream } from './config/logger';
import { errorHandler, notFoundHandler } from './shared/middleware/errorHandler';
import { generalLimiter } from './shared/middleware/rateLimiter';
import { HTTP_STATUS, APP_INFO } from '@yene/shared';

// ─── Create Express App ───────────────────────────────────────────────────────
const app: Application = express();

// ─── Trust Proxy ─────────────────────────────────────────────────────────────
// Required for rate limiting and IP detection behind reverse proxy (Nginx)
app.set('trust proxy', 1);

// ─── Security Middleware ──────────────────────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com'],
      },
    },
  }),
);

// ─── CORS Configuration ───────────────────────────────────────────────────────
const allowedOrigins = [
  env.FRONTEND_URL,
  env.APP_URL,
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, curl)
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        logger.warn(`CORS blocked request from origin: ${origin}`);
        callback(new Error(`Origin ${origin} not allowed by CORS policy`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'X-CSRF-Token',
    ],
    exposedHeaders: ['X-Total-Count', 'X-Page', 'X-Limit'],
    maxAge: 86400, // 24 hours preflight cache
  }),
);

// ─── HTTP Request Logger ──────────────────────────────────────────────────────
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { stream: morganStream }));
}

// ─── Body Parsing Middleware ──────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Cookie Parser ────────────────────────────────────────────────────────────
app.use(cookieParser());

// ─── Global Rate Limiter ──────────────────────────────────────────────────────
app.use('/api', generalLimiter);

// ─── Health Check Route ───────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    status: 'healthy',
    app: APP_INFO.NAME,
    version: APP_INFO.VERSION,
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())} seconds`,
  });
});

// ─── API Info Route ───────────────────────────────────────────────────────────
app.get('/api/v1', (_req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: `Welcome to ${APP_INFO.NAME} API`,
    version: 'v1',
    documentation: `${env.API_URL}/api/v1/docs`,
    endpoints: {
      auth: `${env.API_URL}/api/v1/auth`,
      users: `${env.API_URL}/api/v1/users`,
      restaurants: `${env.API_URL}/api/v1/restaurants`,
      foods: `${env.API_URL}/api/v1/foods`,
      orders: `${env.API_URL}/api/v1/orders`,
      cart: `${env.API_URL}/api/v1/cart`,
      payments: `${env.API_URL}/api/v1/payments`,
      riders: `${env.API_URL}/api/v1/riders`,
      notifications: `${env.API_URL}/api/v1/notifications`,
      reviews: `${env.API_URL}/api/v1/reviews`,
      promotions: `${env.API_URL}/api/v1/promotions`,
      analytics: `${env.API_URL}/api/v1/analytics`,
      admin: `${env.API_URL}/api/v1/admin`,
    },
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
// Routes will be mounted here as we build each module
// Example:
// import authRoutes from './modules/auth/auth.routes';
// app.use('/api/v1/auth', authRoutes);
//
// We will add routes one by one as we build each module
// For now the app is ready to accept route registrations

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use(notFoundHandler);

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

export default app;
