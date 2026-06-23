import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { OTP } from '@yene/shared';
import { logError } from '../../config/logger';
import { InternalServerError } from '../errors/AppError';

// ─── OTP Result Interface ─────────────────────────────────────────────────────
export interface IOtpResult {
  otp: string;
  hashedOtp: string;
  expiresAt: Date;
}

// ─── Generate OTP ─────────────────────────────────────────────────────────────
export const generateOtp = (): string => {
  // Generate cryptographically secure random OTP
  const buffer = crypto.randomBytes(3);
  const otp = ((parseInt(buffer.toString('hex'), 16) % 900000) + 100000).toString();
  return otp.padStart(OTP.LENGTH, '0');
};

// ─── Generate and Hash OTP ────────────────────────────────────────────────────
export const generateAndHashOtp = async (): Promise<IOtpResult> => {
  try {
    const otp = generateOtp();
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);
    const expiresAt = new Date(Date.now() + OTP.EXPIRES_IN_MS);

    return {
      otp,
      hashedOtp,
      expiresAt,
    };
  } catch (error) {
    logError('Failed to generate OTP', error);
    throw new InternalServerError('Failed to generate OTP.');
  }
};

// ─── Verify OTP ───────────────────────────────────────────────────────────────
export const verifyOtp = async (
  plainOtp: string,
  hashedOtp: string,
  expiresAt: Date,
): Promise<{ isValid: boolean; isExpired: boolean }> => {
  try {
    // Check if OTP is expired
    const isExpired = new Date() > expiresAt;
    if (isExpired) {
      return { isValid: false, isExpired: true };
    }

    // Compare OTP
    const isValid = await bcrypt.compare(plainOtp, hashedOtp);
    return { isValid, isExpired: false };
  } catch (error) {
    logError('Failed to verify OTP', error);
    throw new InternalServerError('Failed to verify OTP.');
  }
};

// ─── Is OTP Expired ───────────────────────────────────────────────────────────
export const isOtpExpired = (expiresAt: Date): boolean => {
  return new Date() > expiresAt;
};

// ─── Get OTP Expiry Date ──────────────────────────────────────────────────────
export const getOtpExpiryDate = (): Date => {
  return new Date(Date.now() + OTP.EXPIRES_IN_MS);
};

// ─── Get Remaining OTP Time ───────────────────────────────────────────────────
export const getOtpRemainingSeconds = (expiresAt: Date): number => {
  const remaining = expiresAt.getTime() - Date.now();
  return Math.max(0, Math.floor(remaining / 1000));
};

// ─── Generate Secure Token ────────────────────────────────────────────────────
// Used for password reset tokens and email verification tokens
export const generateSecureToken = (): {
  token: string;
  hashedToken: string;
  expiresAt: Date;
} => {
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  return { token, hashedToken, expiresAt };
};

// ─── Verify Secure Token ──────────────────────────────────────────────────────
export const verifySecureToken = (
  token: string,
  hashedToken: string,
  expiresAt: Date,
): { isValid: boolean; isExpired: boolean } => {
  const isExpired = new Date() > expiresAt;
  if (isExpired) {
    return { isValid: false, isExpired: true };
  }

  const hash = crypto.createHash('sha256').update(token).digest('hex');
  const isValid = hash === hashedToken;
  return { isValid, isExpired: false };
};

// ─── Generate Referral Code ───────────────────────────────────────────────────
export const generateReferralCode = (userId: string): string => {
  const prefix = 'YENE';
  const suffix = userId.slice(-4).toUpperCase();
  const random = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}${random}${suffix}`;
};
