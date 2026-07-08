import { Router } from 'express';
import { authController } from './auth.controller';
import { validateBody } from '../../shared/middleware/validate';
import { protect } from '../../shared/middleware/auth.middleware';
import { authLimiter, otpLimiter } from '../../shared/middleware/rateLimiter';
import {
  RegisterSchema,
  LoginSchema,
  ForgotPasswordSchema,
  VerifyOtpSchema,
  ResendOtpSchema,
  ResetPasswordSchema,
  ChangePasswordSchema,
  RefreshTokenSchema,
  DeleteAccountSchema,
} from '@yene/shared';

// ─── Auth Router ──────────────────────────────────────────────────────────────
const router = Router();

// ─── Public Routes ────────────────────────────────────────────────────────────

// Register
router.post('/register', authLimiter, validateBody(RegisterSchema), authController.register);

// Login
router.post('/login', authLimiter, validateBody(LoginSchema), authController.login);

// Verify OTP
router.post('/verify-otp', otpLimiter, validateBody(VerifyOtpSchema), authController.verifyOtp);

// Resend OTP
router.post('/resend-otp', otpLimiter, validateBody(ResendOtpSchema), authController.resendOtp);

// Forgot Password
router.post(
  '/forgot-password',
  authLimiter,
  validateBody(ForgotPasswordSchema),
  authController.forgotPassword,
);

// Reset Password
router.post(
  '/reset-password',
  authLimiter,
  validateBody(ResetPasswordSchema),
  authController.resetPassword,
);

// Refresh Token
router.post('/refresh', validateBody(RefreshTokenSchema.optional()), authController.refreshToken);

// ─── Protected Routes ─────────────────────────────────────────────────────────

// Get current user
router.get('/me', protect, authController.getMe);

// Change password
router.patch(
  '/change-password',
  protect,
  validateBody(ChangePasswordSchema),
  authController.changePassword,
);

// Logout
router.post('/logout', protect, authController.logout);

// Delete account
router.delete('/account', protect, validateBody(DeleteAccountSchema), authController.deleteAccount);

export default router;
