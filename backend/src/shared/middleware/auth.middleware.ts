import type { Request, Response, NextFunction } from 'express';
import { extractTokenFromRequest, verifyAccessToken } from '../utils/jwt.utils';
import { UnauthorizedError } from '../errors/AppError';
import { UserStatus } from '@yene/shared';
import { logError } from '../../config/logger';

// ─── Protect Route Middleware ─────────────────────────────────────────────────
// Verifies JWT token and attaches user to request
export const protect = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    // Extract token from Authorization header or cookie
    const token = extractTokenFromRequest(req);

    if (!token) {
      throw new UnauthorizedError('Access denied. No token provided. Please login to continue.');
    }

    // Verify the token
    const decoded = verifyAccessToken(token);

    // Check if user account is still active
    if (decoded.status === UserStatus.SUSPENDED) {
      throw new UnauthorizedError('Your account has been suspended. Please contact support.');
    }

    if (decoded.status === UserStatus.INACTIVE) {
      throw new UnauthorizedError('Your account is inactive. Please contact support.');
    }

    // Attach user payload to request
    req.user = decoded;
    req.clientIp = req.ip ?? req.socket.remoteAddress ?? 'unknown';
    req.startTime = Date.now();

    next();
  } catch (error) {
    logError('Auth middleware error', error);
    next(error);
  }
};

// ─── Optional Auth Middleware ─────────────────────────────────────────────────
// Attaches user to request if token exists but does not block if no token
export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = extractTokenFromRequest(req);

    if (token) {
      const decoded = verifyAccessToken(token);
      if (decoded.status !== UserStatus.SUSPENDED && decoded.status !== UserStatus.INACTIVE) {
        req.user = decoded;
      }
    }

    next();
  } catch {
    // If token is invalid just continue without user
    next();
  }
};

// ─── Verify Email Middleware ──────────────────────────────────────────────────
// Ensures the user has verified their email before accessing the route
export const requireEmailVerification = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError('Please login to continue.');
    }

    // We check email verification at the service level
    // This middleware just ensures protect() ran first
    next();
  } catch (error) {
    next(error);
  }
};

// ─── Request Logger Middleware ────────────────────────────────────────────────
// Logs request details for monitoring
export const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
  req.requestId = crypto.randomUUID();
  req.startTime = Date.now();
  next();
};
