// ─── User Roles ───────────────────────────────────────────────────────────────
// Defines the four types of users in the Yene Delivery platform.
// Used by RBAC middleware to control access to routes and resources.
export enum UserRole {
  CUSTOMER = 'customer',
  RESTAURANT_OWNER = 'restaurant_owner',
  RIDER = 'rider',
  ADMIN = 'admin',
}

// ─── User Status ──────────────────────────────────────────────────────────────
// Controls whether a user can access the platform.
// PENDING: registered but email not verified yet
// ACTIVE: fully verified and can use the platform
// INACTIVE: self-deactivated account
// SUSPENDED: banned by admin due to policy violation
export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

// ─── Gender ───────────────────────────────────────────────────────────────────
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

// ─── Auth Provider ────────────────────────────────────────────────────────────
// Tracks how the user signed up — direct registration or via OAuth
export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
}

// ─── OTP Purpose ─────────────────────────────────────────────────────────────
// Defines what an OTP code is being used for
export enum OtpPurpose {
  EMAIL_VERIFICATION = 'email_verification',
  PHONE_VERIFICATION = 'phone_verification',
  PASSWORD_RESET = 'password_reset',
  TWO_FACTOR_AUTH = 'two_factor_auth',
}

// ─── Address Label ────────────────────────────────────────────────────────────
// Predefined labels for saved delivery addresses
export enum AddressLabel {
  HOME = 'home',
  WORK = 'work',
  OTHER = 'other',
}

// ─── Notification Preference ──────────────────────────────────────────────────
export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  IN_APP = 'in_app',
}
