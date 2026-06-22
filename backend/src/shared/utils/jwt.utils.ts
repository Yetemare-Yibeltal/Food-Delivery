import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { logError } from '../../config/logger';
import type { ITokenPayload, IAuthTokens } from '@yene/shared';
import { UserRole, UserStatus, AUTH } from '@yene/shared';
import { TokenError } from '../errors/AppError';
import type { Request } from 'express';

// ─── Generate Access Token ────────────────────────────────────────────────────
export const generateAccessToken = (payload: ITokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
    issuer: 'yene-delivery',
    audience: 'yene-delivery-client',
  });
};

// ─── Generate Refresh Token ───────────────────────────────────────────────────
export const generateRefreshToken = (payload: ITokenPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    issuer: 'yene-delivery',
    audience: 'yene-delivery-client',
  });
};

// ─── Generate Both Tokens ─────────────────────────────────────────────────────
export const generateTokens = (payload: ITokenPayload): IAuthTokens => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const now = new Date();
  const accessTokenExpiresAt = new Date(now.getTime() + AUTH.ACCESS_TOKEN_EXPIRES_MS);
  const refreshTokenExpiresAt = new Date(now.getTime() + AUTH.REFRESH_TOKEN_EXPIRES_MS);

  return {
    accessToken,
    refreshToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
  };
};

// ─── Verify Access Token ──────────────────────────────────────────────────────
export const verifyAccessToken = (token: string): ITokenPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, {
      issuer: 'yene-delivery',
      audience: 'yene-delivery-client',
    }) as ITokenPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenError('Access token has expired. Please login again.');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new TokenError('Invalid access token. Please login again.');
    }
    logError('JWT verification failed', error);
    throw new TokenError('Token verification failed.');
  }
};

// ─── Verify Refresh Token ─────────────────────────────────────────────────────
export const verifyRefreshToken = (token: string): ITokenPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET, {
      issuer: 'yene-delivery',
      audience: 'yene-delivery-client',
    }) as ITokenPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenError('Refresh token has expired. Please login again.');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new TokenError('Invalid refresh token. Please login again.');
    }
    logError('Refresh token verification failed', error);
    throw new TokenError('Refresh token verification failed.');
  }
};

// ─── Decode Token Without Verification ───────────────────────────────────────
export const decodeToken = (token: string): ITokenPayload | null => {
  try {
    return jwt.decode(token) as ITokenPayload;
  } catch {
    return null;
  }
};

// ─── Extract Token from Request ───────────────────────────────────────────────
export const extractTokenFromRequest = (req: Request): string | null => {
  // Check Authorization header first
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check HttpOnly cookie
  if (req.cookies && typeof req.cookies['accessToken'] === 'string') {
    return req.cookies['accessToken'] as string;
  }

  return null;
};

// ─── Extract Refresh Token from Request ───────────────────────────────────────
export const extractRefreshTokenFromRequest = (req: Request): string | null => {
  // Check HttpOnly cookie first
  if (req.cookies && typeof req.cookies['refreshToken'] === 'string') {
    return req.cookies['refreshToken'] as string;
  }

  // Check request body
  if (req.body && typeof req.body.refreshToken === 'string') {
    return req.body.refreshToken as string;
  }

  return null;
};

// ─── Set Token Cookies ────────────────────────────────────────────────────────
export const setTokenCookies = (res: import('express').Response, tokens: IAuthTokens): void => {
  const isProduction = env.NODE_ENV === 'production';

  // Access token cookie
  res.cookie('accessToken', tokens.accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: AUTH.ACCESS_TOKEN_EXPIRES_MS,
    path: '/',
  });

  // Refresh token cookie
  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: AUTH.REFRESH_TOKEN_EXPIRES_MS,
    path: '/api/v1/auth/refresh',
  });
};

// ─── Clear Token Cookies ──────────────────────────────────────────────────────
export const clearTokenCookies = (res: import('express').Response): void => {
  res.clearCookie('accessToken', { path: '/' });
  res.clearCookie('refreshToken', { path: '/api/v1/auth/refresh' });
};

// ─── Build Token Payload ──────────────────────────────────────────────────────
export const buildTokenPayload = (user: {
  _id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}): ITokenPayload => {
  return {
    userId: user._id,
    email: user.email,
    role: user.role,
    status: user.status,
  };
};

// ─── Is Token Expired ─────────────────────────────────────────────────────────
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    return decoded.exp < Math.floor(Date.now() / 1000);
  } catch {
    return true;
  }
};

// ─── Get Token Expiry Date ────────────────────────────────────────────────────
export const getTokenExpiryDate = (token: string): Date | null => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return null;
    return new Date(decoded.exp * 1000);
  } catch {
    return null;
  }
};
