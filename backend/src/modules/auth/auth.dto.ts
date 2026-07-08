import type { IPublicUser, IAuthTokens } from '@yene/shared';
import { UserRole } from '@yene/shared';

// ─── Register DTO ─────────────────────────────────────────────────────────────
export interface RegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
  gender?: string;
  dateOfBirth?: string;
  referralCode?: string;
  agreeToTerms: boolean;
}

// ─── Login DTO ────────────────────────────────────────────────────────────────
export interface LoginDTO {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceToken?: string;
  platform?: 'web' | 'android' | 'ios';
}

// ─── Forgot Password DTO ──────────────────────────────────────────────────────
export interface ForgotPasswordDTO {
  email: string;
}

// ─── Verify OTP DTO ───────────────────────────────────────────────────────────
export interface VerifyOtpDTO {
  email: string;
  otp: string;
  purpose: string;
}

// ─── Resend OTP DTO ───────────────────────────────────────────────────────────
export interface ResendOtpDTO {
  email: string;
  purpose: string;
}

// ─── Reset Password DTO ───────────────────────────────────────────────────────
export interface ResetPasswordDTO {
  token: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// ─── Change Password DTO ──────────────────────────────────────────────────────
export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ─── Refresh Token DTO ────────────────────────────────────────────────────────
export interface RefreshTokenDTO {
  refreshToken: string;
}

// ─── Auth Response DTO ────────────────────────────────────────────────────────
export interface AuthResponseDTO {
  user: IPublicUser;
  tokens: IAuthTokens;
}

// ─── OTP Response DTO ─────────────────────────────────────────────────────────
export interface OtpResponseDTO {
  message: string;
  email: string;
  expiresAt: Date;
  resendAvailableAt?: Date;
}

// ─── Message Response DTO ─────────────────────────────────────────────────────
export interface MessageResponseDTO {
  message: string;
  messageAm?: string;
}