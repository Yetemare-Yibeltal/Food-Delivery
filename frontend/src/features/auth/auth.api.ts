import { api } from '@/lib/api/client';
import { ENDPOINTS } from '@/lib/api/endpoints';
import type {
  RegisterInput,
  LoginInput,
  VerifyOtpInput,
  ResendOtpInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
  IPublicUser,
  IAuthTokens,
} from '@yene/shared';

// ─── Response Types ───────────────────────────────────────────────────────────
export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IAuthResponse {
  user: IPublicUser;
  tokens: IAuthTokens;
}

export interface IOtpResponse {
  message: string;
  email: string;
  expiresAt: Date;
  resendAvailableAt?: Date;
}

export interface IMessageResponse {
  message: string;
  messageAm?: string;
}

// ─── Register ─────────────────────────────────────────────────────────────────
export const registerApi = async (
  data: RegisterInput,
): Promise<IApiResponse<IOtpResponse>> => {
  const response = await api.post<IApiResponse<IOtpResponse>>(
    ENDPOINTS.AUTH.REGISTER,
    data,
  );
  return response.data;
};

// ─── Login ────────────────────────────────────────────────────────────────────
export const loginApi = async (
  data: LoginInput,
): Promise<IApiResponse<IAuthResponse>> => {
  const response = await api.post<IApiResponse<IAuthResponse>>(
    ENDPOINTS.AUTH.LOGIN,
    data,
  );
  return response.data;
};

// ─── Verify OTP ───────────────────────────────────────────────────────────────
export const verifyOtpApi = async (
  data: VerifyOtpInput,
): Promise<IApiResponse<IAuthResponse | IMessageResponse>> => {
  const response = await api.post
    IApiResponse<IAuthResponse | IMessageResponse>
  >(ENDPOINTS.AUTH.VERIFY_OTP, data);
  return response.data;
};

// ─── Resend OTP ───────────────────────────────────────────────────────────────
export const resendOtpApi = async (
  data: ResendOtpInput,
): Promise<IApiResponse<IOtpResponse>> => {
  const response = await api.post<IApiResponse<IOtpResponse>>(
    ENDPOINTS.AUTH.RESEND_OTP,
    data,
  );
  return response.data;
};

// ─── Forgot Password ──────────────────────────────────────────────────────────
export const forgotPasswordApi = async (
  data: ForgotPasswordInput,
): Promise<IApiResponse<IMessageResponse>> => {
  const response = await api.post<IApiResponse<IMessageResponse>>(
    ENDPOINTS.AUTH.FORGOT_PASSWORD,
    data,
  );
  return response.data;
};

// ─── Reset Password ───────────────────────────────────────────────────────────
export const resetPasswordApi = async (
  data: ResetPasswordInput,
): Promise<IApiResponse<IMessageResponse>> => {
  const response = await api.post<IApiResponse<IMessageResponse>>(
    ENDPOINTS.AUTH.RESET_PASSWORD,
    data,
  );
  return response.data;
};

// ─── Change Password ──────────────────────────────────────────────────────────
export const changePasswordApi = async (
  data: ChangePasswordInput,
): Promise<IApiResponse<IMessageResponse>> => {
  const response = await api.patch<IApiResponse<IMessageResponse>>(
    ENDPOINTS.AUTH.CHANGE_PASSWORD,
    data,
  );
  return response.data;
};

// ─── Refresh Token ────────────────────────────────────────────────────────────
export const refreshTokenApi = async (
  refreshToken: string,
): Promise<IApiResponse<{ tokens: IAuthTokens }>> => {
  const response = await api.post<IApiResponse<{ tokens: IAuthTokens }>>(
    ENDPOINTS.AUTH.REFRESH,
    { refreshToken },
  );
  return response.data;
};

// ─── Get Current User ─────────────────────────────────────────────────────────
export const getMeApi = async (): Promise<IApiResponse<IPublicUser>> => {
  const response = await api.get<IApiResponse<IPublicUser>>(
    ENDPOINTS.AUTH.ME,
  );
  return response.data;
};

// ─── Logout ───────────────────────────────────────────────────────────────────
export const logoutApi = async (
  deviceToken?: string,
): Promise<IApiResponse<null>> => {
  const response = await api.post<IApiResponse<null>>(
    ENDPOINTS.AUTH.LOGOUT,
    { deviceToken },
  );
  return response.data;
};

// ─── Delete Account ───────────────────────────────────────────────────────────
export const deleteAccountApi = async (
  password: string,
): Promise<IApiResponse<null>> => {
  const response = await api.delete<IApiResponse<null>>(
    ENDPOINTS.AUTH.DELETE_ACCOUNT,
    { data: { password } },
  );
  return response.data;
};