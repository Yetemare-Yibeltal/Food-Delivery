import { z } from 'zod';
import { UserRole, Gender, AddressLabel, NotificationChannel } from '../enums/user.enum';
import { ETHIOPIAN_PHONE, AUTH, OTP } from '../constants/app.constants';

// ─── Reusable Field Validators ────────────────────────────────────────────────
export const firstNameValidator = z
  .string({ required_error: 'First name is required' })
  .min(2, 'First name must be at least 2 characters')
  .max(50, 'First name must be at most 50 characters')
  .regex(
    /^[a-zA-ZÀ-ÿ\u1200-\u137F\s'-]+$/,
    'First name can only contain letters, spaces, hyphens and apostrophes',
  )
  .trim();

export const lastNameValidator = z
  .string({ required_error: 'Last name is required' })
  .min(2, 'Last name must be at least 2 characters')
  .max(50, 'Last name must be at most 50 characters')
  .regex(
    /^[a-zA-ZÀ-ÿ\u1200-\u137F\s'-]+$/,
    'Last name can only contain letters, spaces, hyphens and apostrophes',
  )
  .trim();

export const emailValidator = z
  .string({ required_error: 'Email is required' })
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(255, 'Email must be at most 255 characters')
  .toLowerCase()
  .trim();

export const phoneValidator = z
  .string({ required_error: 'Phone number is required' })
  .min(1, 'Phone number is required')
  .regex(
    ETHIOPIAN_PHONE.REGEX,
    `Invalid Ethiopian phone number. Use format: ${ETHIOPIAN_PHONE.FORMAT}`,
  );

export const passwordValidator = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password must be at most 100 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    'Password must contain at least one special character',
  );

export const otpValidator = z
  .string({ required_error: 'OTP is required' })
  .length(OTP.LENGTH, `OTP must be exactly ${OTP.LENGTH} digits`)
  .regex(/^\d+$/, 'OTP must contain only numbers');

export const coordinatesValidator = z.object({
  lat: z
    .number({ required_error: 'Latitude is required' })
    .min(-90, 'Invalid latitude value')
    .max(90, 'Invalid latitude value'),
  lng: z
    .number({ required_error: 'Longitude is required' })
    .min(-180, 'Invalid longitude value')
    .max(180, 'Invalid longitude value'),
});

export const dateOfBirthValidator = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val) return true;
      const date = new Date(val);
      if (isNaN(date.getTime())) return false;
      const now = new Date();
      const age = now.getFullYear() - date.getFullYear();
      return age >= 16 && age <= 100;
    },
    { message: 'You must be at least 16 years old to register' },
  );

// ─── Register Schema ──────────────────────────────────────────────────────────
export const RegisterSchema = z
  .object({
    firstName: firstNameValidator,
    lastName: lastNameValidator,
    email: emailValidator,
    phone: phoneValidator,
    password: passwordValidator,
    confirmPassword: z
      .string({ required_error: 'Please confirm your password' })
      .min(1, 'Please confirm your password'),
    role: z
      .nativeEnum(UserRole, {
        errorMap: () => ({ message: 'Invalid user role' }),
      })
      .optional()
      .default(UserRole.CUSTOMER),
    gender: z
      .nativeEnum(Gender, {
        errorMap: () => ({ message: 'Invalid gender value' }),
      })
      .optional(),
    dateOfBirth: dateOfBirthValidator,
    referralCode: z.string().max(20, 'Referral code must be at most 20 characters').optional(),
    agreeToTerms: z
      .boolean({
        required_error: 'You must agree to the terms and conditions',
      })
      .refine((val) => val === true, {
        message: 'You must agree to the terms and conditions',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ─── Login Schema ─────────────────────────────────────────────────────────────
export const LoginSchema = z.object({
  email: emailValidator,
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
  deviceToken: z.string().max(500, 'Invalid device token').optional(),
  platform: z
    .enum(['web', 'android', 'ios'], {
      errorMap: () => ({ message: 'Invalid platform' }),
    })
    .optional()
    .default('web'),
});

// ─── Forgot Password Schema ───────────────────────────────────────────────────
export const ForgotPasswordSchema = z.object({
  email: emailValidator,
});

// ─── Verify OTP Schema ────────────────────────────────────────────────────────
export const VerifyOtpSchema = z.object({
  email: emailValidator,
  otp: otpValidator,
  purpose: z.enum(
    ['email_verification', 'phone_verification', 'password_reset', 'two_factor_auth'],
    {
      required_error: 'OTP purpose is required',
      errorMap: () => ({ message: 'Invalid OTP purpose' }),
    },
  ),
});

// ─── Resend OTP Schema ────────────────────────────────────────────────────────
export const ResendOtpSchema = z.object({
  email: emailValidator,
  purpose: z.enum(
    ['email_verification', 'phone_verification', 'password_reset', 'two_factor_auth'],
    {
      required_error: 'OTP purpose is required',
      errorMap: () => ({ message: 'Invalid OTP purpose' }),
    },
  ),
});

// ─── Reset Password Schema ────────────────────────────────────────────────────
export const ResetPasswordSchema = z
  .object({
    token: z
      .string({ required_error: 'Reset token is required' })
      .min(1, 'Reset token is required'),
    email: emailValidator,
    password: passwordValidator,
    confirmPassword: z
      .string({ required_error: 'Please confirm your password' })
      .min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ─── Change Password Schema ───────────────────────────────────────────────────
export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string({ required_error: 'Current password is required' })
      .min(1, 'Current password is required'),
    newPassword: passwordValidator,
    confirmPassword: z
      .string({ required_error: 'Please confirm your new password' })
      .min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from your current password',
    path: ['newPassword'],
  });

// ─── Refresh Token Schema ─────────────────────────────────────────────────────
export const RefreshTokenSchema = z.object({
  refreshToken: z
    .string({ required_error: 'Refresh token is required' })
    .min(1, 'Refresh token is required'),
});

// ─── Update Profile Schema ────────────────────────────────────────────────────
export const UpdateProfileSchema = z
  .object({
    firstName: firstNameValidator.optional(),
    lastName: lastNameValidator.optional(),
    phone: phoneValidator.optional(),
    gender: z
      .nativeEnum(Gender, {
        errorMap: () => ({ message: 'Invalid gender value' }),
      })
      .optional(),
    dateOfBirth: dateOfBirthValidator,
  })
  .refine(
    (data) =>
      data.firstName !== undefined ||
      data.lastName !== undefined ||
      data.phone !== undefined ||
      data.gender !== undefined ||
      data.dateOfBirth !== undefined,
    {
      message: 'At least one field must be provided to update profile',
    },
  );

// ─── Add Address Schema ───────────────────────────────────────────────────────
export const AddAddressSchema = z.object({
  label: z.nativeEnum(AddressLabel, {
    required_error: 'Address label is required',
    errorMap: () => ({ message: 'Invalid address label' }),
  }),
  customLabel: z.string().max(30, 'Custom label must be at most 30 characters').optional(),
  recipientName: z
    .string()
    .min(2, 'Recipient name must be at least 2 characters')
    .max(100, 'Recipient name must be at most 100 characters')
    .optional(),
  recipientPhone: phoneValidator.optional(),
  street: z
    .string({ required_error: 'Street address is required' })
    .min(5, 'Street address must be at least 5 characters')
    .max(200, 'Street address must be at most 200 characters')
    .trim(),
  specificLocation: z
    .string()
    .max(200, 'Specific location must be at most 200 characters')
    .optional(),
  city: z.string({ required_error: 'City is required' }).min(1, 'City is required'),
  subCity: z.string().max(100, 'Sub city must be at most 100 characters').optional(),
  woreda: z.string().max(100, 'Woreda must be at most 100 characters').optional(),
  coordinates: coordinatesValidator,
  isDefault: z.boolean().optional().default(false),
});

// ─── Update Address Schema ────────────────────────────────────────────────────
export const UpdateAddressSchema = z.object({
  addressId: z
    .string({ required_error: 'Address ID is required' })
    .min(1, 'Address ID is required'),
  label: z
    .nativeEnum(AddressLabel, {
      errorMap: () => ({ message: 'Invalid address label' }),
    })
    .optional(),
  customLabel: z.string().max(30, 'Custom label must be at most 30 characters').optional(),
  recipientName: z
    .string()
    .min(2, 'Recipient name must be at least 2 characters')
    .max(100, 'Recipient name must be at most 100 characters')
    .optional(),
  recipientPhone: phoneValidator.optional(),
  street: z
    .string()
    .min(5, 'Street address must be at least 5 characters')
    .max(200, 'Street address must be at most 200 characters')
    .trim()
    .optional(),
  specificLocation: z
    .string()
    .max(200, 'Specific location must be at most 200 characters')
    .optional(),
  city: z.string().min(1, 'City is required').optional(),
  subCity: z.string().max(100, 'Sub city must be at most 100 characters').optional(),
  woreda: z.string().max(100, 'Woreda must be at most 100 characters').optional(),
  coordinates: coordinatesValidator.optional(),
  isDefault: z.boolean().optional(),
});

// ─── Update Preferences Schema ────────────────────────────────────────────────
export const UpdatePreferencesSchema = z.object({
  language: z
    .enum(['en', 'am'], {
      errorMap: () => ({ message: 'Invalid language. Supported: en, am' }),
    })
    .optional(),
  darkMode: z.boolean().optional(),
  notifications: z
    .object({
      orderUpdates: z
        .array(
          z.nativeEnum(NotificationChannel, {
            errorMap: () => ({ message: 'Invalid notification channel' }),
          }),
        )
        .optional(),
      promotions: z
        .array(
          z.nativeEnum(NotificationChannel, {
            errorMap: () => ({ message: 'Invalid notification channel' }),
          }),
        )
        .optional(),
      newsletters: z
        .array(
          z.nativeEnum(NotificationChannel, {
            errorMap: () => ({ message: 'Invalid notification channel' }),
          }),
        )
        .optional(),
      accountAlerts: z
        .array(
          z.nativeEnum(NotificationChannel, {
            errorMap: () => ({ message: 'Invalid notification channel' }),
          }),
        )
        .optional(),
    })
    .optional(),
});

// ─── Delete Account Schema ────────────────────────────────────────────────────
export const DeleteAccountSchema = z.object({
  password: z
    .string({ required_error: 'Password is required to delete account' })
    .min(1, 'Password is required to delete account'),
  reason: z.string().max(500, 'Reason must be at most 500 characters').optional(),
});

// ─── Device Token Schema ──────────────────────────────────────────────────────
export const DeviceTokenSchema = z.object({
  token: z
    .string({ required_error: 'Device token is required' })
    .min(1, 'Device token is required')
    .max(500, 'Invalid device token'),
  platform: z.enum(['web', 'android', 'ios'], {
    required_error: 'Platform is required',
    errorMap: () => ({ message: 'Invalid platform' }),
  }),
});

// ─── Remove Device Token Schema ───────────────────────────────────────────────
export const RemoveDeviceTokenSchema = z.object({
  token: z
    .string({ required_error: 'Device token is required' })
    .min(1, 'Device token is required'),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type VerifyOtpInput = z.infer<typeof VerifyOtpSchema>;
export type ResendOtpInput = z.infer<typeof ResendOtpSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;
export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type AddAddressInput = z.infer<typeof AddAddressSchema>;
export type UpdateAddressInput = z.infer<typeof UpdateAddressSchema>;
export type UpdatePreferencesInput = z.infer<typeof UpdatePreferencesSchema>;
export type DeleteAccountInput = z.infer<typeof DeleteAccountSchema>;
export type DeviceTokenInput = z.infer<typeof DeviceTokenSchema>;
export type RemoveDeviceTokenInput = z.infer<typeof RemoveDeviceTokenSchema>;
