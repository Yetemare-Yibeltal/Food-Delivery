import { HTTP_STATUS } from '@yene/shared';

// ─── Base App Error ───────────────────────────────────────────────────────────
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: 'fail' | 'error';
  public readonly isOperational: boolean;
  public readonly errors?: IErrorDetail[];

  constructor(
    message: string,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errors?: IErrorDetail[],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    this.isOperational = true;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ─── Error Detail Interface ───────────────────────────────────────────────────
export interface IErrorDetail {
  field?: string;
  message: string;
  code?: string;
}

// ─── 400 Bad Request ──────────────────────────────────────────────────────────
export class BadRequestError extends AppError {
  constructor(message: string = 'Bad request', errors?: IErrorDetail[]) {
    super(message, HTTP_STATUS.BAD_REQUEST, errors);
  }
}

// ─── 401 Unauthorized ─────────────────────────────────────────────────────────
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized. Please login to continue.') {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}

// ─── 403 Forbidden ───────────────────────────────────────────────────────────
export class ForbiddenError extends AppError {
  constructor(message: string = 'You do not have permission to perform this action.') {
    super(message, HTTP_STATUS.FORBIDDEN);
  }
}

// ─── 404 Not Found ────────────────────────────────────────────────────────────
export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found.`, HTTP_STATUS.NOT_FOUND);
  }
}

// ─── 409 Conflict ────────────────────────────────────────────────────────────
export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists.') {
    super(message, HTTP_STATUS.CONFLICT);
  }
}

// ─── 422 Validation Error ─────────────────────────────────────────────────────
export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed.', errors?: IErrorDetail[]) {
    super(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, errors);
  }
}

// ─── 429 Too Many Requests ────────────────────────────────────────────────────
export class TooManyRequestsError extends AppError {
  constructor(message: string = 'Too many requests. Please try again later.') {
    super(message, HTTP_STATUS.TOO_MANY_REQUESTS);
  }
}

// ─── 500 Internal Server Error ────────────────────────────────────────────────
export class InternalServerError extends AppError {
  constructor(message: string = 'Something went wrong. Please try again.') {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

// ─── Database Error ───────────────────────────────────────────────────────────
export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed.') {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

// ─── Payment Error ────────────────────────────────────────────────────────────
export class PaymentError extends AppError {
  constructor(message: string = 'Payment processing failed.') {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

// ─── Upload Error ─────────────────────────────────────────────────────────────
export class UploadError extends AppError {
  constructor(message: string = 'File upload failed.') {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

// ─── Auth Error ───────────────────────────────────────────────────────────────
export class AuthError extends AppError {
  constructor(message: string = 'Authentication failed.') {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}

// ─── Token Error ──────────────────────────────────────────────────────────────
export class TokenError extends AppError {
  constructor(message: string = 'Invalid or expired token.') {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}

// ─── Type Guard ───────────────────────────────────────────────────────────────
export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};
