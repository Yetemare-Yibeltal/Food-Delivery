import mongoose from 'mongoose';
import { env } from './env';

// ─── Connection Options ───────────────────────────────────────────────────────
const mongooseOptions: mongoose.ConnectOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

// ─── Connect to Database ──────────────────────────────────────────────────────
export const connectDatabase = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(env.MONGODB_URI, mongooseOptions);
    console.warn(
      `✅ MongoDB connected: ${connection.connection.host} — DB: ${connection.connection.name}`,
    );
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// ─── Disconnect from Database ─────────────────────────────────────────────────
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.warn('✅ MongoDB disconnected successfully');
  } catch (error) {
    console.error('❌ MongoDB disconnect failed:', error);
  }
};

// ─── Connection Event Listeners ───────────────────────────────────────────────
mongoose.connection.on('connected', () => {
  console.warn('📦 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ Mongoose connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Mongoose disconnected from MongoDB');
});

mongoose.connection.on('reconnected', () => {
  console.warn('🔄 Mongoose reconnected to MongoDB');
});

// ─── Handle Process Termination ───────────────────────────────────────────────
process.on('SIGINT', async () => {
  await disconnectDatabase();
  console.warn('💤 MongoDB connection closed due to app termination');
  process.exit(0);
});

export default connectDatabase;
