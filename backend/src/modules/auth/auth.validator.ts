import {
  RegisterSchema,
  LoginSchema,
  ForgotPasswordSchema,
  VerifyOtpSchema,
  ResendOtpSchema,
  ResetPasswordSchema,
  ChangePasswordSchema,
  RefreshTokenSchema,
  UpdateProfileSchema,
  AddAddressSchema,
  UpdateAddressSchema,
  UpdatePreferencesSchema,
  DeleteAccountSchema,
  DeviceTokenSchema,
  RemoveDeviceTokenSchema,
} from '@yene/shared';

// ─── Auth Validators ──────────────────────────────────────────────────────────
// Re-export shared validators for use in auth routes middleware
export {
  RegisterSchema,
  LoginSchema,
  ForgotPasswordSchema,
  VerifyOtpSchema,
  ResendOtpSchema,
  ResetPasswordSchema,
  ChangePasswordSchema,
  RefreshTokenSchema,
  UpdateProfileSchema,
  AddAddressSchema,
  UpdateAddressSchema,
  UpdatePreferencesSchema,
  DeleteAccountSchema,
  DeviceTokenSchema,
  RemoveDeviceTokenSchema,
};
