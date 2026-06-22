import rateLimit from 'express-rate-limit';
import { HTTP_STATUS, RATE_LIMIT, ERROR_MESSAGES } from '@yene/shared';

// ─── Rate Limit Response ──────────────────────────────────────────────────────
const rateLimitResponse = (message: string) => ({
  success: false,
  status: 'fail',
  message,
});

// ─── General API Rate Limiter ─────────────────────────────────────────────────
// Applied to all routes — 100 requests per 15 minutes per IP
export const generalLimiter = rateLimit({
  windowMs: RATE_LIMIT.WINDOW_MS,
  max: RATE_LIMIT.MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  message: rateLimitResponse(ERROR_MESSAGES.TOO_MANY_ATTEMPTS),
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
  keyGenerator: (req) => {
    return req.ip ?? req.socket.remoteAddress ?? 'unknown';
  },
});

// ─── Auth Rate Limiter ────────────────────────────────────────────────────────
// Applied to login, register — 10 requests per 15 minutes per IP
export const authLimiter = rateLimit({
  windowMs: RATE_LIMIT.AUTH_WINDOW_MS,
  max: RATE_LIMIT.AUTH_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  message: rateLimitResponse('Too many authentication attempts. Please try again in 15 minutes.'),
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
  keyGenerator: (req) => {
    return req.ip ?? req.socket.remoteAddress ?? 'unknown';
  },
});

// ─── OTP Rate Limiter ─────────────────────────────────────────────────────────
// Applied to OTP send/verify — 5 requests per hour per IP
export const otpLimiter = rateLimit({
  windowMs: RATE_LIMIT.OTP_WINDOW_MS,
  max: RATE_LIMIT.OTP_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  message: rateLimitResponse('Too many OTP requests. Please try again in 1 hour.'),
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
  keyGenerator: (req) => {
    return req.ip ?? req.socket.remoteAddress ?? 'unknown';
  },
});

// ─── Payment Rate Limiter ─────────────────────────────────────────────────────
// Applied to payment routes — 20 requests per hour per IP
export const paymentLimiter = rateLimit({
  windowMs: RATE_LIMIT.PAYMENT_WINDOW_MS,
  max: RATE_LIMIT.PAYMENT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  message: rateLimitResponse('Too many payment requests. Please try again in 1 hour.'),
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
  keyGenerator: (req) => {
    return req.ip ?? req.socket.remoteAddress ?? 'unknown';
  },
});

// ─── Upload Rate Limiter ──────────────────────────────────────────────────────
// Applied to file upload routes — 20 requests per hour per IP
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitResponse('Too many upload requests. Please try again in 1 hour.'),
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
  keyGenerator: (req) => {
    return req.ip ?? req.socket.remoteAddress ?? 'unknown';
  },
});

// ─── Search Rate Limiter ──────────────────────────────────────────────────────
// Applied to search routes — 60 requests per minute per IP
export const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitResponse('Too many search requests. Please slow down.'),
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
  keyGenerator: (req) => {
    return req.ip ?? req.socket.remoteAddress ?? 'unknown';
  },
});

export default generalLimiter;
