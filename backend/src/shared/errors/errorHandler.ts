import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { HTTP_STATUS, ERROR_MESSAGES } from '@yene/shared';
import { AppError, isAppError, ValidationError, NotFoundError } from '../errors/AppError';
import { logError } from '../../config/logger';

// ─── Error Response Interface ─────────────────────────────────────────────────
interface IErrorResponse {
  success: false;
  status: string;
  message: string;
  errors?: { field?: string; message: string }[];
  stack?: string;
}

// ─── Handle Zod Validation Error ──────────────────────────────────────────────
const handleZodError = (error: ZodError): AppError => {
  const errors = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
  return new ValidationError('Validation failed. Please check your input.', errors);
};

// ─── Handle Mongoose Validation Error ────────────────────────────────────────
const handleMongooseValidationError = (error: mongoose.Error.ValidationError): AppError => {
  const errors = Object.values(error.errors).map((err) => ({
    field: err.path,
    message: err.message,
  }));
  return new ValidationError('Invalid input data.', errors);
};

// ─── Handle Mongoose Cast Error ───────────────────────────────────────────────
const handleMongooseCastError = (error: mongoose.Error.CastError): AppError => {
  return new NotFoundError(`Invalid ${error.path}: ${error.value as string}`);
};

// ─── Handle Mongoose Duplicate Key Error ──────────────────────────────────────
const handleMongooseDuplicateKeyError = (error: {
  keyValue: Record<string, unknown>;
}): AppError => {
  const field = Object.keys(error.keyValue)[0];
  const value = error.keyValue[field];
  return new AppError(
    `${field} '${value as string}' already exists. Please use a different ${field}.`,
    HTTP_STATUS.CONFLICT,
  );
};

// ─── Handle JWT Error ─────────────────────────────────────────────────────────
const handleJWTError = (): AppError => {
  return new AppError(ERROR_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
};

// ─── Handle JWT Expired Error ─────────────────────────────────────────────────
const handleJWTExpiredError = (): AppError => {
  return new AppError(ERROR_MESSAGES.TOKEN_EXPIRED, HTTP_STATUS.UNAUTHORIZED);
};

// ─── Send Error Response in Development ───────────────────────────────────────
const sendDevError = (error: AppError, res: Response): void => {
  const response: IErrorResponse = {
    success: false,
    status: error.status,
    message: error.message,
    errors: error.errors,
    stack: error.stack,
  };
  res.status(error.statusCode).json(response);
};

// ─── Send Error Response in Production ───────────────────────────────────────
const sendProdError = (error: AppError, res: Response): void => {
  if (error.isOperational) {
    const response: IErrorResponse = {
      success: false,
      status: error.status,
      message: error.message,
      errors: error.errors,
    };
    res.status(error.statusCode).json(response);
  } else {
    logError('UNHANDLED ERROR', error);
    const response: IErrorResponse = {
      success: false,
      status: 'error',
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    };
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
  }
};

// ─── Global Error Handler Middleware ──────────────────────────────────────────
export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let appError: AppError;

  // Log the original error
  logError(`${req.method} ${req.originalUrl}`, error);

  if (isAppError(error)) {
    appError = error;
  } else if (error instanceof ZodError) {
    appError = handleZodError(error);
  } else if (error instanceof mongoose.Error.ValidationError) {
    appError = handleMongooseValidationError(error);
  } else if (error instanceof mongoose.Error.CastError) {
    appError = handleMongooseCastError(error);
  } else if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code: number }).code === 11000
  ) {
    appError = handleMongooseDuplicateKeyError(error as { keyValue: Record<string, unknown> });
  } else if (error instanceof Error && error.name === 'JsonWebTokenError') {
    appError = handleJWTError();
  } else if (error instanceof Error && error.name === 'TokenExpiredError') {
    appError = handleJWTExpiredError();
  } else if (error instanceof Error) {
    appError = new AppError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    appError.isOperational === false;
  } else {
    appError = new AppError(
      ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }

  if (process.env['NODE_ENV'] === 'development') {
    sendDevError(appError, res);
  } else {
    sendProdError(appError, res);
  }
};

// ─── 404 Not Found Handler ────────────────────────────────────────────────────
export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  const error = new AppError(
    `Route ${req.originalUrl} not found on this server.`,
    HTTP_STATUS.NOT_FOUND,
  );
  next(error);
};

export default errorHandler;
