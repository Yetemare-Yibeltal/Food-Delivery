import winston from 'winston';
import path from 'path';
import { env } from './env';

// ─── Log Levels ───────────────────────────────────────────────────────────────
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// ─── Log Colors ───────────────────────────────────────────────────────────────
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// ─── Log Format ───────────────────────────────────────────────────────────────
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ timestamp, level, message, ...metadata }) => {
    let log = `[${timestamp as string}] ${level}: ${message as string}`;
    if (Object.keys(metadata).length > 0) {
      log += `\n${JSON.stringify(metadata, null, 2)}`;
    }
    return log;
  }),
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

// ─── Log Transports ───────────────────────────────────────────────────────────
const transports: winston.transport[] = [
  // Console transport — always active
  new winston.transports.Console({
    format: consoleFormat,
    level: env.NODE_ENV === 'development' ? 'debug' : 'warn',
  }),
];

// File transports — only in production
if (env.NODE_ENV === 'production') {
  transports.push(
    // Error log file
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'error.log'),
      level: 'error',
      format: fileFormat,
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 5,
    }),
    // Combined log file
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'combined.log'),
      format: fileFormat,
      maxsize: 10 * 1024 * 1024, // 10MB
      maxFiles: 10,
    }),
  );
}

// ─── Create Logger ────────────────────────────────────────────────────────────
export const logger = winston.createLogger({
  levels,
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  transports,
  exitOnError: false,
  silent: env.NODE_ENV === 'test',
});

// ─── Stream for Morgan HTTP Logger ───────────────────────────────────────────
export const morganStream = {
  write: (message: string): void => {
    logger.http(message.trim());
  },
};

// ─── Logger Helper Methods ────────────────────────────────────────────────────
export const logError = (message: string, error?: unknown): void => {
  if (error instanceof Error) {
    logger.error(message, {
      error: error.message,
      stack: error.stack,
    });
  } else {
    logger.error(message, { error });
  }
};

export const logInfo = (message: string, meta?: Record<string, unknown>): void => {
  logger.info(message, meta);
};

export const logWarn = (message: string, meta?: Record<string, unknown>): void => {
  logger.warn(message, meta);
};

export const logDebug = (message: string, meta?: Record<string, unknown>): void => {
  logger.debug(message, meta);
};

export const logHttp = (message: string, meta?: Record<string, unknown>): void => {
  logger.http(message, meta);
};

export default logger;
