'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/Toast';
import { useAuthStore } from '@/stores/auth.store';
import {
  registerApi,
  loginApi,
  verifyOtpApi,
  resendOtpApi,
  forgotPasswordApi,
  resetPasswordApi,
  changePasswordApi,
  logoutApi,
  getMeApi,
  deleteAccountApi,
} from './auth.api';
import type {
  RegisterInput,
  LoginInput,
  VerifyOtpInput,
  ResendOtpInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
} from '@yene/shared';
import type { IAuthResponse } from './auth.api';
import axios from 'axios';

// ─── Query Keys ───────────────────────────────────────────────────────────────
export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

// ─── Get API Error Message ────────────────────────────────────────────────────
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as {
      message?: string;
      errors?: Array<{ message: string }>;
    };
    if (data?.errors && data.errors.length > 0) {
      return data.errors.map((e) => e.message).join(', ');
    }
    return data?.message ?? 'Something went wrong. Please try again.';
  }
  if (error instanceof Error) return error.message;
  return 'Something went wrong. Please try again.';
};

// ─── Use Register ─────────────────────────────────────────────────────────────
export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => registerApi(data),
    onSuccess: (response, variables) => {
      toast.success('Account created!', {
        description: 'Please check your email for the verification code.',
      });
      router.push(
        `/auth/verify-otp?email=${encodeURIComponent(variables.email)}&purpose=email_verification`,
      );
    },
    onError: (error: unknown) => {
      toast.error('Registration failed', {
        description: getErrorMessage(error),
      });
    },
  });
};

// ─── Use Login ────────────────────────────────────────────────────────────────
export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginInput) => loginApi(data),
    onSuccess: (response) => {
      const { user, tokens } = response.data;
      setAuth(user, tokens);
      queryClient.setQueryData(authKeys.me(), user);
      toast.success('Welcome back!', {
        description: `Good to see you, ${user.firstName}!`,
      });

      // Redirect based on role
      const roleRedirects: Record<string, string> = {
        admin: '/admin/dashboard',
        restaurant_owner: '/restaurant/dashboard',
        rider: '/rider/dashboard',
        customer: '/',
      };

      router.push(roleRedirects[user.role] ?? '/');
    },
    onError: (error: unknown) => {
      toast.error('Login failed', {
        description: getErrorMessage(error),
      });
    },
  });
};

// ─── Use Verify OTP ───────────────────────────────────────────────────────────
export const useVerifyOtp = () => {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: VerifyOtpInput) => verifyOtpApi(data),
    onSuccess: (response, variables) => {
      const data = response.data;

      if ('tokens' in data && 'user' in data) {
        const authData = data as IAuthResponse;
        setAuth(authData.user, authData.tokens);
        toast.success('Email verified!', {
          description: `Welcome to Yene Delivery, ${authData.user.firstName}!`,
        });
        router.push('/');
        return;
      }

      if (variables.purpose === 'password_reset') {
        toast.success('OTP verified!', {
          description: 'You can now reset your password.',
        });
        router.push(`/auth/reset-password?email=${encodeURIComponent(variables.email)}`);
        return;
      }

      toast.success('Verified successfully!');
      router.push('/');
    },
    onError: (error: unknown) => {
      toast.error('Verification failed', {
        description: getErrorMessage(error),
      });
    },
  });
};

// ─── Use Resend OTP ───────────────────────────────────────────────────────────
export const useResendOtp = () => {
  return useMutation({
    mutationFn: (data: ResendOtpInput) => resendOtpApi(data),
    onSuccess: () => {
      toast.success('OTP sent!', {
        description: 'A new verification code has been sent to your email.',
      });
    },
    onError: (error: unknown) => {
      toast.error('Failed to resend OTP', {
        description: getErrorMessage(error),
      });
    },
  });
};

// ─── Use Forgot Password ──────────────────────────────────────────────────────
export const useForgotPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ForgotPasswordInput) => forgotPasswordApi(data),
    onSuccess: (_, variables) => {
      toast.success('Email sent!', {
        description: 'Check your email for the password reset code.',
      });
      router.push(
        `/auth/verify-otp?email=${encodeURIComponent(variables.email)}&purpose=password_reset`,
      );
    },
    onError: (error: unknown) => {
      toast.error('Failed to send reset email', {
        description: getErrorMessage(error),
      });
    },
  });
};

// ─── Use Reset Password ───────────────────────────────────────────────────────
export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordInput) => resetPasswordApi(data),
    onSuccess: () => {
      toast.success('Password reset!', {
        description: 'Your password has been reset. Please login.',
      });
      router.push('/auth/login');
    },
    onError: (error: unknown) => {
      toast.error('Failed to reset password', {
        description: getErrorMessage(error),
      });
    },
  });
};

// ─── Use Change Password ──────────────────────────────────────────────────────
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordInput) => changePasswordApi(data),
    onSuccess: () => {
      toast.success('Password changed!', {
        description: 'Your password has been updated successfully.',
      });
    },
    onError: (error: unknown) => {
      toast.error('Failed to change password', {
        description: getErrorMessage(error),
      });
    },
  });
};

// ─── Use Logout ───────────────────────────────────────────────────────────────
export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deviceToken?: string) => logoutApi(deviceToken),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      toast.success('Logged out successfully');
      router.push('/');
    },
    onError: () => {
      clearAuth();
      queryClient.clear();
      router.push('/');
    },
  });
};

// ─── Use Get Me ───────────────────────────────────────────────────────────────
export const useGetMe = (enabled = true) => {
  const { isAuthenticated, setUser } = useAuthStore();

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const response = await getMeApi();
      setUser(response.data);
      return response.data;
    },
    enabled: enabled && isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

// ─── Use Delete Account ───────────────────────────────────────────────────────
export const useDeleteAccount = () => {
  const { clearAuth } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (password: string) => deleteAccountApi(password),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      toast.success('Account deleted', {
        description: 'Your account has been permanently deleted.',
      });
      router.push('/');
    },
    onError: (error: unknown) => {
      toast.error('Failed to delete account', {
        description: getErrorMessage(error),
      });
    },
  });
};
