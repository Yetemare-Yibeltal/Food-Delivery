import type { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { setTokenCookies, clearTokenCookies } from '../../shared/utils/jwt.utils';
import { sendSuccess, sendCreated, sendNoContent } from '../../shared/utils/response.utils';
import { SUCCESS_MESSAGES, HTTP_STATUS } from '@yene/shared';
import type { RegisterDTO, LoginDTO, AuthResponseDTO } from './auth.dto';

// ─── Auth Controller ──────────────────────────────────────────────────────────
export class AuthController {
  // ─── Register ─────────────────────────────────────────────────────────
  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body as RegisterDTO;
      const result = await authService.register(data);
      sendCreated(res, result, result.message);
    } catch (error) {
      next(error);
    }
  };

  // ─── Login ────────────────────────────────────────────────────────────
  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body as LoginDTO;
      const ip = req.ip ?? req.socket.remoteAddress ?? 'unknown';
      const result = await authService.login(data, ip);

      // Set HttpOnly cookies
      setTokenCookies(res, result.tokens);

      sendSuccess(res, result, SUCCESS_MESSAGES.LOGIN_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  // ─── Verify OTP ───────────────────────────────────────────────────────
  verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, otp, purpose } = req.body as {
        email: string;
        otp: string;
        purpose: string;
      };

      const result = await authService.verifyOtp(email, otp, purpose);

      // If email verification — set cookies for auto-login
      if ('tokens' in result && 'user' in result) {
        const authResult = result as AuthResponseDTO;
        setTokenCookies(res, authResult.tokens);
        sendSuccess(res, authResult, SUCCESS_MESSAGES.EMAIL_VERIFIED);
        return;
      }

      sendSuccess(res, result, SUCCESS_MESSAGES.OTP_VERIFIED);
    } catch (error) {
      next(error);
    }
  };

  // ─── Resend OTP ───────────────────────────────────────────────────────
  resendOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, purpose } = req.body as {
        email: string;
        purpose: string;
      };

      const result = await authService.resendOtp(email, purpose);
      sendSuccess(res, result, result.message);
    } catch (error) {
      next(error);
    }
  };

  // ─── Forgot Password ──────────────────────────────────────────────────
  forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body as { email: string };
      const result = await authService.forgotPassword(email);
      sendSuccess(res, result, result.message);
    } catch (error) {
      next(error);
    }
  };

  // ─── Reset Password ───────────────────────────────────────────────────
  resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
        confirmPassword: string;
      };

      const result = await authService.resetPassword(email, password);
      sendSuccess(res, result, result.message);
    } catch (error) {
      next(error);
    }
  };

  // ─── Change Password ──────────────────────────────────────────────────
  changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const { currentPassword, newPassword } = req.body as {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
      };

      const result = await authService.changePassword(userId, currentPassword, newPassword);

      sendSuccess(res, result, result.message);
    } catch (error) {
      next(error);
    }
  };

  // ─── Refresh Token ────────────────────────────────────────────────────
  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refreshToken =
        (req.cookies as Record<string, string>)['refreshToken'] ??
        (req.body as { refreshToken?: string }).refreshToken;

      if (!refreshToken) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: 'Refresh token is required',
        });
        return;
      }

      const result = await authService.refreshToken(refreshToken);

      // Set new cookies
      setTokenCookies(res, result.tokens);

      sendSuccess(res, result, 'Token refreshed successfully');
    } catch (error) {
      next(error);
    }
  };

  // ─── Get Me ───────────────────────────────────────────────────────────
  getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const user = await authService.getMe(userId);
      sendSuccess(res, user, 'User retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  // ─── Logout ───────────────────────────────────────────────────────────
  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const deviceToken = (req.body as { deviceToken?: string }).deviceToken;

      await authService.logout(userId, deviceToken);

      // Clear cookies
      clearTokenCookies(res);

      sendSuccess(res, null, SUCCESS_MESSAGES.LOGOUT_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  // ─── Delete Account ───────────────────────────────────────────────────
  deleteAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const { password } = req.body as { password: string };

      await authService.deleteAccount(userId, password);

      clearTokenCookies(res);

      sendNoContent(res);
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();
export default authController;
