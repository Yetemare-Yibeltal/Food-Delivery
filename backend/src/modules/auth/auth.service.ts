import { authRepository } from './auth.repository';
import { hashPassword, comparePassword } from '../../shared/utils/bcrypt.utils';
import {
  generateAndHashOtp,
  verifyOtp,
  generateSecureToken,
  verifySecureToken,
  generateReferralCode,
} from '../../shared/utils/otp.utils';
import {
  generateTokens,
  buildTokenPayload,
  verifyRefreshToken,
} from '../../shared/utils/jwt.utils';
import {
  sendOtpEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
} from '../../shared/utils/email.utils';
import { logInfo, logError } from '../../config/logger';
import {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  NotFoundError,
  TooManyRequestsError,
  ForbiddenError,
} from '../../shared/errors/AppError';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  OTP,
  AUTH,
  UserStatus,
  UserRole,
  OtpPurpose,
} from '@yene/shared';
import type { IUserDocument } from './auth.schema';
import type {
  RegisterDTO,
  LoginDTO,
  AuthResponseDTO,
  OtpResponseDTO,
  MessageResponseDTO,
} from './auth.dto';
import { sanitizeUser } from '../../shared/utils/response.utils';

// ─── Auth Service ─────────────────────────────────────────────────────────────
export class AuthService {
  // ─── Register ───────────────────────────────────────────────────────────
  async register(data: RegisterDTO): Promise<OtpResponseDTO> {
    const { firstName, lastName, email, phone, password, role, gender, dateOfBirth, referralCode } =
      data;

    // Check if email already exists
    const emailExists = await authRepository.emailExists(email);
    if (emailExists) {
      throw new ConflictError(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    // Check if phone already exists
    const phoneExists = await authRepository.phoneExists(phone);
    if (phoneExists) {
      throw new ConflictError(ERROR_MESSAGES.PHONE_ALREADY_EXISTS);
    }

    // Find referrer if referral code provided
    let referredBy: string | undefined;
    if (referralCode) {
      const referrer = await authRepository.findByReferralCode(referralCode);
      if (referrer) {
        referredBy = referrer._id.toString();
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate unique referral code for new user
    const newReferralCode = generateReferralCode(email);

    // Create user
    const user = await authRepository.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role: role ?? UserRole.CUSTOMER,
      gender,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      referralCode: newReferralCode,
      referredBy,
    });

    // Generate and save OTP for email verification
    const { otp, hashedOtp, expiresAt } = await generateAndHashOtp();

    await authRepository.saveOtp(user._id.toString(), {
      hashedCode: hashedOtp,
      purpose: OtpPurpose.EMAIL_VERIFICATION,
      expiresAt,
    });

    // Send verification OTP email
    try {
      await sendOtpEmail(email, firstName, otp, OtpPurpose.EMAIL_VERIFICATION);
    } catch (emailError) {
      logError('Failed to send verification email', emailError);
    }

    logInfo('New user registered', { userId: user._id, email, role });

    return {
      message: SUCCESS_MESSAGES.REGISTER_SUCCESS,
      email,
      expiresAt,
    };
  }

  // ─── Login ───────────────────────────────────────────────────────────────
  async login(data: LoginDTO, ip: string): Promise<AuthResponseDTO> {
    const { email, password, deviceToken, platform } = data;

    // Find user with password
    const user = await authRepository.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Check if account is locked
    if (user.isLocked) {
      throw new TooManyRequestsError(
        'Account temporarily locked due to too many failed login attempts. Try again in 30 minutes.',
      );
    }

    // Check if account is suspended
    if (user.status === UserStatus.SUSPENDED) {
      throw new ForbiddenError(ERROR_MESSAGES.ACCOUNT_SUSPENDED);
    }

    // Verify password
    if (!user.password) {
      throw new UnauthorizedError('This account uses social login. Please sign in with Google.');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      await user.incrementLoginAttempts();
      throw new UnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      throw new ForbiddenError(ERROR_MESSAGES.EMAIL_NOT_VERIFIED);
    }

    // Check if account is active
    if (user.status === UserStatus.INACTIVE) {
      throw new ForbiddenError(ERROR_MESSAGES.ACCOUNT_INACTIVE);
    }

    // Reset login attempts on successful login
    await user.resetLoginAttempts();

    // Update last login
    await authRepository.updateLastLogin(user._id.toString(), ip);

    // Add device token if provided
    if (deviceToken && platform) {
      await authRepository.addDeviceToken(user._id.toString(), deviceToken, platform);
    }

    // Generate tokens
    const tokenPayload = buildTokenPayload({
      _id: user._id.toString(),
      email: user.email,
      role: user.role,
      status: user.status,
    });

    const tokens = generateTokens(tokenPayload);

    logInfo('User logged in', { userId: user._id, email });

    return {
      user: sanitizeUser(user),
      tokens,
    };
  }

  // ─── Verify OTP ──────────────────────────────────────────────────────────
  async verifyOtp(
    email: string,
    otp: string,
    purpose: string,
  ): Promise<AuthResponseDTO | MessageResponseDTO> {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('User');
    }

    if (!user.otp || !user.otp.hashedCode || !user.otp.expiresAt) {
      throw new BadRequestError('No OTP found. Please request a new OTP.');
    }

    if (user.otp.purpose !== purpose) {
      throw new BadRequestError('Invalid OTP purpose.');
    }

    if (user.otp.attempts >= OTP.MAX_ATTEMPTS) {
      throw new TooManyRequestsError('Too many OTP attempts. Please request a new OTP.');
    }

    const { isValid, isExpired } = await verifyOtp(otp, user.otp.hashedCode, user.otp.expiresAt);

    if (isExpired) {
      throw new BadRequestError('OTP has expired. Please request a new OTP.');
    }

    if (!isValid) {
      await authRepository.incrementOtpAttempts(user._id.toString());
      throw new BadRequestError('Invalid OTP. Please try again.');
    }

    // Clear OTP after successful verification
    await authRepository.clearOtp(user._id.toString());

    // Handle different OTP purposes
    if (purpose === OtpPurpose.EMAIL_VERIFICATION) {
      const updatedUser = await authRepository.verifyEmail(user._id.toString());
      if (!updatedUser) throw new NotFoundError('User');

      // Send welcome email
      try {
        await sendWelcomeEmail(email, user.firstName);
      } catch (emailError) {
        logError('Failed to send welcome email', emailError);
      }

      // Generate tokens for auto-login after verification
      const tokenPayload = buildTokenPayload({
        _id: updatedUser._id.toString(),
        email: updatedUser.email,
        role: updatedUser.role,
        status: updatedUser.status,
      });

      const tokens = generateTokens(tokenPayload);

      logInfo('Email verified', { userId: user._id, email });

      return {
        user: sanitizeUser(updatedUser),
        tokens,
      };
    }

    if (purpose === OtpPurpose.PASSWORD_RESET) {
      return {
        message: SUCCESS_MESSAGES.OTP_VERIFIED,
        messageAm: 'ኦቲፒ በትክክል ተረጋግጧል',
      };
    }

    return {
      message: SUCCESS_MESSAGES.OTP_VERIFIED,
    };
  }

  // ─── Resend OTP ──────────────────────────────────────────────────────────
  async resendOtp(email: string, purpose: string): Promise<OtpResponseDTO> {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('User');
    }

    // Check resend cooldown
    if (user.otp?.lastResendAt) {
      const cooldownMs = OTP.RESEND_COOLDOWN_SECONDS * 1000;
      const timeSinceLastResend = Date.now() - user.otp.lastResendAt.getTime();
      if (timeSinceLastResend < cooldownMs) {
        const waitSeconds = Math.ceil((cooldownMs - timeSinceLastResend) / 1000);
        throw new TooManyRequestsError(
          `Please wait ${waitSeconds} seconds before requesting a new OTP.`,
        );
      }
    }

    // Check max resend count
    if (user.otp?.resendCount && user.otp.resendCount >= OTP.MAX_RESEND_COUNT) {
      throw new TooManyRequestsError('Maximum OTP resend limit reached. Please contact support.');
    }

    // Generate new OTP
    const { otp, hashedOtp, expiresAt } = await generateAndHashOtp();

    await authRepository.saveOtp(user._id.toString(), {
      hashedCode: hashedOtp,
      purpose,
      expiresAt,
    });

    await authRepository.updateOtpResendInfo(user._id.toString());

    // Send OTP email
    try {
      await sendOtpEmail(email, user.firstName, otp, purpose);
    } catch (emailError) {
      logError('Failed to resend OTP email', emailError);
      throw new BadRequestError('Failed to send OTP. Please try again.');
    }

    const resendAvailableAt = new Date(Date.now() + OTP.RESEND_COOLDOWN_SECONDS * 1000);

    logInfo('OTP resent', { userId: user._id, email, purpose });

    return {
      message: SUCCESS_MESSAGES.OTP_SENT,
      email,
      expiresAt,
      resendAvailableAt,
    };
  }

  // ─── Forgot Password ─────────────────────────────────────────────────────
  async forgotPassword(email: string): Promise<MessageResponseDTO> {
    const user = await authRepository.findByEmail(email);

    // Always return success to prevent email enumeration
    if (!user) {
      return { message: SUCCESS_MESSAGES.PASSWORD_RESET_EMAIL_SENT };
    }

    if (user.status === UserStatus.SUSPENDED) {
      throw new ForbiddenError(ERROR_MESSAGES.ACCOUNT_SUSPENDED);
    }

    // Generate secure reset token
    const { token, hashedToken, expiresAt } = generateSecureToken();

    await authRepository.savePasswordResetToken(user._id.toString(), hashedToken, expiresAt);

    // Also generate OTP for extra security
    const { otp, hashedOtp, expiresAt: otpExpiresAt } = await generateAndHashOtp();

    await authRepository.saveOtp(user._id.toString(), {
      hashedCode: hashedOtp,
      purpose: OtpPurpose.PASSWORD_RESET,
      expiresAt: otpExpiresAt,
    });

    // Send password reset email with OTP
    try {
      await sendOtpEmail(email, user.firstName, otp, OtpPurpose.PASSWORD_RESET);
    } catch (emailError) {
      logError('Failed to send password reset email', emailError);
      throw new BadRequestError('Failed to send password reset email. Please try again.');
    }

    logInfo('Password reset requested', { userId: user._id, email });

    return { message: SUCCESS_MESSAGES.PASSWORD_RESET_EMAIL_SENT };
  }

  // ─── Reset Password ───────────────────────────────────────────────────────
  async resetPassword(email: string, newPassword: string): Promise<MessageResponseDTO> {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('User');
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Reset password
    await authRepository.resetPassword(user._id.toString(), hashedPassword);

    logInfo('Password reset successful', { userId: user._id, email });

    return { message: SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS };
  }

  // ─── Change Password ──────────────────────────────────────────────────────
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<MessageResponseDTO> {
    const user = await authRepository.findByIdWithPassword(userId);
    if (!user) {
      throw new NotFoundError('User');
    }

    if (!user.password) {
      throw new BadRequestError('Cannot change password for social login accounts.');
    }

    const isCurrentPasswordValid = await comparePassword(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedError('Current password is incorrect.');
    }

    const hashedPassword = await hashPassword(newPassword);
    await authRepository.resetPassword(userId, hashedPassword);

    logInfo('Password changed', { userId });

    return { message: SUCCESS_MESSAGES.PASSWORD_CHANGED };
  }

  // ─── Refresh Token ────────────────────────────────────────────────────────
  async refreshToken(refreshToken: string): Promise<{ tokens: ReturnType<typeof generateTokens> }> {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await authRepository.findById(decoded.userId);
    if (!user) {
      throw new UnauthorizedError(ERROR_MESSAGES.TOKEN_INVALID);
    }

    if (user.status === UserStatus.SUSPENDED) {
      throw new ForbiddenError(ERROR_MESSAGES.ACCOUNT_SUSPENDED);
    }

    const tokenPayload = buildTokenPayload({
      _id: user._id.toString(),
      email: user.email,
      role: user.role,
      status: user.status,
    });

    const tokens = generateTokens(tokenPayload);

    return { tokens };
  }

  // ─── Logout ───────────────────────────────────────────────────────────────
  async logout(userId: string, deviceToken?: string): Promise<void> {
    if (deviceToken) {
      await authRepository.removeDeviceToken(userId, deviceToken);
    }

    logInfo('User logged out', { userId });
  }

  // ─── Get Current User ─────────────────────────────────────────────────────
  async getMe(userId: string): Promise<IUserDocument> {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User');
    }
    return user;
  }

  // ─── Delete Account ───────────────────────────────────────────────────────
  async deleteAccount(userId: string, password: string): Promise<MessageResponseDTO> {
    const user = await authRepository.findByIdWithPassword(userId);
    if (!user) {
      throw new NotFoundError('User');
    }

    if (user.password) {
      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        throw new UnauthorizedError('Password is incorrect.');
      }
    }

    await authRepository.softDelete(userId);

    logInfo('Account deleted', { userId });

    return { message: 'Account deleted successfully.' };
  }
}

export const authService = new AuthService();
export default authService;
