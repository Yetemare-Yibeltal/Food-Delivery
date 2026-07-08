import mongoose, { type Document, type Model, Schema } from 'mongoose';
import {
  UserRole,
  UserStatus,
  Gender,
  AuthProvider,
  OtpPurpose,
  AddressLabel,
  NotificationChannel,
} from '@yene/shared';

// ─── Address Sub-Document ─────────────────────────────────────────────────────
const AddressSchema = new Schema(
  {
    label: {
      type: String,
      enum: Object.values(AddressLabel),
      required: true,
    },
    customLabel: { type: String, maxlength: 30 },
    recipientName: { type: String, maxlength: 100 },
    recipientPhone: { type: String },
    street: { type: String, required: true, maxlength: 200 },
    specificLocation: { type: String, maxlength: 200 },
    city: { type: String, required: true },
    subCity: { type: String, maxlength: 100 },
    woreda: { type: String, maxlength: 100 },
    coordinates: {
      lat: { type: Number, required: true, min: -90, max: 90 },
      lng: { type: Number, required: true, min: -180, max: 180 },
    },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true, timestamps: true },
);

// ─── Notification Preferences Sub-Document ────────────────────────────────────
const NotificationPreferencesSchema = new Schema(
  {
    orderUpdates: {
      type: [String],
      enum: Object.values(NotificationChannel),
      default: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
    },
    promotions: {
      type: [String],
      enum: Object.values(NotificationChannel),
      default: [NotificationChannel.IN_APP],
    },
    newsletters: {
      type: [String],
      enum: Object.values(NotificationChannel),
      default: [],
    },
    accountAlerts: {
      type: [String],
      enum: Object.values(NotificationChannel),
      default: [NotificationChannel.EMAIL, NotificationChannel.IN_APP],
    },
  },
  { _id: false },
);

// ─── User Preferences Sub-Document ───────────────────────────────────────────
const UserPreferencesSchema = new Schema(
  {
    language: { type: String, enum: ['en', 'am'], default: 'en' },
    currency: { type: String, default: 'ETB' },
    notifications: {
      type: NotificationPreferencesSchema,
      default: () => ({}),
    },
    darkMode: { type: Boolean, default: true },
  },
  { _id: false },
);

// ─── Device Token Sub-Document ────────────────────────────────────────────────
const DeviceTokenSchema = new Schema(
  {
    token: { type: String, required: true },
    platform: {
      type: String,
      enum: ['web', 'android', 'ios'],
      required: true,
    },
    addedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

// ─── User Stats Sub-Document ──────────────────────────────────────────────────
const UserStatsSchema = new Schema(
  {
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    cancelledOrders: { type: Number, default: 0 },
    averageOrderValue: { type: Number, default: 0 },
    favoriteRestaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    lastOrderAt: { type: Date },
  },
  { _id: false },
);

// ─── OTP Sub-Document ─────────────────────────────────────────────────────────
const OtpSchema = new Schema(
  {
    code: { type: String },
    hashedCode: { type: String },
    purpose: { type: String, enum: Object.values(OtpPurpose) },
    expiresAt: { type: Date },
    attempts: { type: Number, default: 0 },
    resendCount: { type: Number, default: 0 },
    lastResendAt: { type: Date },
  },
  { _id: false },
);

// ─── User Document Interface ──────────────────────────────────────────────────
export interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  gender?: Gender;
  dateOfBirth?: Date;
  avatar?: string;
  avatarPublicId?: string;
  authProvider: AuthProvider;
  googleId?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  addresses: mongoose.Types.DocumentArray<mongoose.Document>;
  preferences: {
    language: string;
    currency: string;
    notifications: Record<string, string[]>;
    darkMode: boolean;
  };
  deviceTokens: Array<{ token: string; platform: string; addedAt: Date }>;
  stats: {
    totalOrders: number;
    totalSpent: number;
    cancelledOrders: number;
    averageOrderValue: number;
    favoriteRestaurant?: mongoose.Types.ObjectId;
    lastOrderAt?: Date;
  };
  otp?: {
    code?: string;
    hashedCode?: string;
    purpose?: string;
    expiresAt?: Date;
    attempts: number;
    resendCount: number;
    lastResendAt?: Date;
  };
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  loginAttempts: number;
  lockUntil?: Date;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  passwordChangedAt?: Date;
  suspensionReason?: string;
  suspendedAt?: Date;
  suspendedBy?: mongoose.Types.ObjectId;
  referralCode?: string;
  referredBy?: mongoose.Types.ObjectId;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  isLocked: boolean;
  incrementLoginAttempts(): Promise<void>;
  resetLoginAttempts(): Promise<void>;
}

// ─── User Model Interface ─────────────────────────────────────────────────────
export interface IUserModel extends Model<IUserDocument> {
  findByEmail(email: string): Promise<IUserDocument | null>;
}

// ─── User Schema ──────────────────────────────────────────────────────────────
const UserSchema = new Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [255, 'Email cannot exceed 255 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    password: {
      type: String,
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.PENDING,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    dateOfBirth: { type: Date },
    avatar: { type: String },
    avatarPublicId: { type: String },
    authProvider: {
      type: String,
      enum: Object.values(AuthProvider),
      default: AuthProvider.LOCAL,
    },
    googleId: { type: String, sparse: true },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    addresses: { type: [AddressSchema], default: [] },
    preferences: {
      type: UserPreferencesSchema,
      default: () => ({}),
    },
    deviceTokens: { type: [DeviceTokenSchema], default: [] },
    stats: {
      type: UserStatsSchema,
      default: () => ({}),
    },
    otp: { type: OtpSchema },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    emailVerificationToken: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    lastLoginAt: { type: Date },
    lastLoginIp: { type: String },
    passwordChangedAt: { type: Date },
    suspensionReason: { type: String },
    suspendedAt: { type: Date },
    suspendedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    referralCode: { type: String, unique: true, sparse: true },
    referredBy: { type: Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ─── Virtuals ─────────────────────────────────────────────────────────────────
UserSchema.virtual('fullName').get(function (this: IUserDocument): string {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('isLocked').get(function (this: IUserDocument): boolean {
  return !!(this.lockUntil && this.lockUntil > new Date());
});

// ─── Indexes ──────────────────────────────────────────────────────────────────
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ phone: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ status: 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ referralCode: 1 }, { sparse: true });
UserSchema.index({ 'addresses.coordinates': '2dsphere' });

// ─── Static Methods ───────────────────────────────────────────────────────────
UserSchema.statics.findByEmail = function (email: string): Promise<IUserDocument | null> {
  return this.findOne({ email: email.toLowerCase().trim() }).select('+password');
};

// ─── Instance Methods ─────────────────────────────────────────────────────────
UserSchema.methods.incrementLoginAttempts = async function (this: IUserDocument): Promise<void> {
  if (this.lockUntil && this.lockUntil < new Date()) {
    await this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 },
    });
    return;
  }

  const updates: mongoose.UpdateQuery<IUserDocument> = {
    $inc: { loginAttempts: 1 },
  };

  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = {
      lockUntil: new Date(Date.now() + 30 * 60 * 1000),
    };
  }

  await this.updateOne(updates);
};

UserSchema.methods.resetLoginAttempts = async function (this: IUserDocument): Promise<void> {
  await this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 },
  });
};

// ─── Pre-Save Middleware ──────────────────────────────────────────────────────
UserSchema.pre('save', function (this: IUserDocument, next): void {
  if (this.isModified('password')) {
    this.passwordChangedAt = new Date();
  }
  next();
});

// ─── Export Model ─────────────────────────────────────────────────────────────
export const UserModel =
  (mongoose.models['User'] as IUserModel) ??
  mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default UserModel;
