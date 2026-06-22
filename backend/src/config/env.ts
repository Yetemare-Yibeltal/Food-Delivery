import dotenv from 'dotenv';
import path from 'path';

// Load .env from root folder
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// ─── Environment Variables Interface ──────────────────────────────────────────
interface IEnvConfig {
  // Application
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  APP_NAME: string;
  APP_URL: string;
  API_URL: string;

  // Database
  MONGODB_URI: string;

  // JWT
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES_IN: string;

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;

  // Email
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;

  // Payments
  CHAPA_SECRET_KEY: string;
  CHAPA_BASE_URL: string;
  TELEBIRR_APP_ID: string;
  TELEBIRR_APP_KEY: string;
  TELEBIRR_BASE_URL: string;
  CBE_BIRR_API_KEY: string;
  CBE_BIRR_BASE_URL: string;

  // Frontend
  FRONTEND_URL: string;
}

// ─── Required Variables ───────────────────────────────────────────────────────
const requiredVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'SMTP_HOST',
  'SMTP_USER',
  'SMTP_PASS',
];

// ─── Validate Environment Variables ──────────────────────────────────────────
const validateEnv = (): void => {
  const missing: string[] = [];

  for (const key of requiredVars) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map((k) => `  - ${k}`).join('\n')}\n` +
        `Please check your .env file.`,
    );
  }
};

// ─── Only validate in production ──────────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  validateEnv();
}

// ─── Export Config ────────────────────────────────────────────────────────────
export const env: IEnvConfig = {
  // Application
  NODE_ENV: (process.env['NODE_ENV'] as IEnvConfig['NODE_ENV']) || 'development',
  PORT: parseInt(process.env['PORT'] || '4000', 10),
  APP_NAME: process.env['APP_NAME'] || 'Yene Delivery',
  APP_URL: process.env['APP_URL'] || 'http://localhost:3000',
  API_URL: process.env['API_URL'] || 'http://localhost:4000',

  // Database
  MONGODB_URI: process.env['MONGODB_URI'] || '',

  // JWT
  JWT_SECRET: process.env['JWT_SECRET'] || 'dev_jwt_secret_change_in_production',
  JWT_EXPIRES_IN: process.env['JWT_EXPIRES_IN'] || '15m',
  JWT_REFRESH_SECRET:
    process.env['JWT_REFRESH_SECRET'] || 'dev_refresh_secret_change_in_production',
  JWT_REFRESH_EXPIRES_IN: process.env['JWT_REFRESH_EXPIRES_IN'] || '7d',

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env['CLOUDINARY_CLOUD_NAME'] || '',
  CLOUDINARY_API_KEY: process.env['CLOUDINARY_API_KEY'] || '',
  CLOUDINARY_API_SECRET: process.env['CLOUDINARY_API_SECRET'] || '',

  // Email
  SMTP_HOST: process.env['SMTP_HOST'] || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env['SMTP_PORT'] || '587', 10),
  SMTP_USER: process.env['SMTP_USER'] || '',
  SMTP_PASS: process.env['SMTP_PASS'] || '',

  // Payments
  CHAPA_SECRET_KEY: process.env['CHAPA_SECRET_KEY'] || '',
  CHAPA_BASE_URL: process.env['CHAPA_BASE_URL'] || 'https://api.chapa.co/v1',
  TELEBIRR_APP_ID: process.env['TELEBIRR_APP_ID'] || '',
  TELEBIRR_APP_KEY: process.env['TELEBIRR_APP_KEY'] || '',
  TELEBIRR_BASE_URL: process.env['TELEBIRR_BASE_URL'] || 'https://developer.ethiotelecom.et/api',
  CBE_BIRR_API_KEY: process.env['CBE_BIRR_API_KEY'] || '',
  CBE_BIRR_BASE_URL: process.env['CBE_BIRR_BASE_URL'] || 'https://api.cbebirr.com/test',

  // Frontend
  FRONTEND_URL: process.env['FRONTEND_URL'] || 'http://localhost:3000',
};

export default env;
