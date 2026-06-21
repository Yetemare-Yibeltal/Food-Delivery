import type {
  UserRole,
  UserStatus,
  Gender,
  AuthProvider,
  AddressLabel,
  NotificationChannel,
} from '../enums/user.enum';

// ─── Address ──────────────────────────────────────────────────────────────────
export interface IAddress {
  _id: string;
  label: AddressLabel;
  customLabel?: string;
  recipientName?: string;
  recipientPhone?: string;
  street: string;
  specificLocation?: string;
  city: string;
  subCity?: string;
  woreda?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Notification Preferences ─────────────────────────────────────────────────
export interface INotificationPreferences {
  orderUpdates: NotificationChannel[];
  promotions: NotificationChannel[];
  newsletters: NotificationChannel[];
  accountAlerts: NotificationChannel[];
}

// ─── User Preferences ─────────────────────────────────────────────────────────
export interface IUserPreferences {
  language: 'en' | 'am';
  currency: 'ETB';
  notifications: INotificationPreferences;
  darkMode: boolean;
}

// ─── User Device Token ────────────────────────────────────────────────────────
export interface IDeviceToken {
  token: string;
  platform: 'web' | 'android' | 'ios';
  addedAt: Date;
}

// ─── User Stats ───────────────────────────────────────────────────────────────
export interface IUserStats {
  totalOrders: number;
  totalSpent: number;
  cancelledOrders: number;
  averageOrderValue: number;
  favoriteRestaurant?: string;
  lastOrderAt?: Date;
}

// ─── Main User Interface ──────────────────────────────────────────────────────
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  gender?: Gender;
  dateOfBirth?: Date;
  avatar?: string;
  authProvider: AuthProvider;
  googleId?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  addresses: IAddress[];
  preferences: IUserPreferences;
  deviceTokens: IDeviceToken[];
  stats: IUserStats;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  passwordChangedAt?: Date;
  suspensionReason?: string;
  suspendedAt?: Date;
  suspendedBy?: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Auth Tokens ──────────────────────────────────────────────────────────────
export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
}

// ─── Auth Response ────────────────────────────────────────────────────────────
export interface IAuthResponse {
  user: IPublicUser;
  tokens: IAuthTokens;
}

// ─── Public User (safe to send to frontend) ───────────────────────────────────
export interface IPublicUser {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  gender?: Gender;
  dateOfBirth?: Date;
  avatar?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  addresses: IAddress[];
  preferences: IUserPreferences;
  stats: IUserStats;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Register DTO ─────────────────────────────────────────────────────────────
export interface IRegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
  gender?: Gender;
  dateOfBirth?: Date;
  referralCode?: string;
}

// ─── Login DTO ────────────────────────────────────────────────────────────────
export interface ILoginDTO {
  email: string;
  password: string;
  deviceToken?: string;
  platform?: 'web' | 'android' | 'ios';
}

// ─── Forgot Password DTO ──────────────────────────────────────────────────────
export interface IForgotPasswordDTO {
  email: string;
}

// ─── Reset Password DTO ───────────────────────────────────────────────────────
export interface IResetPasswordDTO {
  token: string;
  password: string;
  confirmPassword: string;
}

// ─── Change Password DTO ──────────────────────────────────────────────────────
export interface IChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ─── Verify OTP DTO ───────────────────────────────────────────────────────────
export interface IVerifyOtpDTO {
  email: string;
  otp: string;
  purpose: string;
}

// ─── Update Profile DTO ───────────────────────────────────────────────────────
export interface IUpdateProfileDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: Gender;
  dateOfBirth?: Date;
  avatar?: string;
}

// ─── Update Preferences DTO ───────────────────────────────────────────────────
export interface IUpdatePreferencesDTO {
  language?: 'en' | 'am';
  darkMode?: boolean;
  notifications?: Partial<INotificationPreferences>;
}

// ─── Add Address DTO ──────────────────────────────────────────────────────────
export interface IAddAddressDTO {
  label: AddressLabel;
  customLabel?: string;
  recipientName?: string;
  recipientPhone?: string;
  street: string;
  specificLocation?: string;
  city: string;
  subCity?: string;
  woreda?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isDefault?: boolean;
}

// ─── Update Address DTO ───────────────────────────────────────────────────────
export interface IUpdateAddressDTO extends Partial<IAddAddressDTO> {
  addressId: string;
}

// ─── Paginated Users ──────────────────────────────────────────────────────────
export interface IPaginatedUsers {
  users: IPublicUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ─── User Filters (Admin) ─────────────────────────────────────────────────────
export interface IUserFilters {
  role?: UserRole;
  status?: UserStatus;
  city?: string;
  search?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ─── Token Payload ────────────────────────────────────────────────────────────
export interface ITokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  iat?: number;
  exp?: number;
}

// ─── Refresh Token ────────────────────────────────────────────────────────────
export interface IRefreshTokenDTO {
  refreshToken: string;
}

// ─── API Response Wrapper ─────────────────────────────────────────────────────
export interface IApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: IFieldError[];
  meta?: IResponseMeta;
}

// ─── Field Error ──────────────────────────────────────────────────────────────
export interface IFieldError {
  field: string;
  message: string;
}

// ─── Response Meta ────────────────────────────────────────────────────────────
export interface IResponseMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}
