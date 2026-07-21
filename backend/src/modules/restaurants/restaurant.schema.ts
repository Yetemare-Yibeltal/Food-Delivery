import mongoose, { type Document, type Model, Schema } from 'mongoose';
import { RestaurantStatus, CuisineType } from '@yene/shared';

// ─── Working Hours Sub-Document ───────────────────────────────────────────────
const WorkingHoursSchema = new Schema(
  {
    open: { type: String, required: true },
    close: { type: String, required: true },
    isOpen: { type: Boolean, default: true },
  },
  { _id: false },
);

// ─── Schedule Sub-Document ────────────────────────────────────────────────────
const ScheduleSchema = new Schema(
  {
    monday: {
      type: WorkingHoursSchema,
      default: () => ({ open: '08:00', close: '22:00', isOpen: true }),
    },
    tuesday: {
      type: WorkingHoursSchema,
      default: () => ({ open: '08:00', close: '22:00', isOpen: true }),
    },
    wednesday: {
      type: WorkingHoursSchema,
      default: () => ({ open: '08:00', close: '22:00', isOpen: true }),
    },
    thursday: {
      type: WorkingHoursSchema,
      default: () => ({ open: '08:00', close: '22:00', isOpen: true }),
    },
    friday: {
      type: WorkingHoursSchema,
      default: () => ({ open: '08:00', close: '22:00', isOpen: true }),
    },
    saturday: {
      type: WorkingHoursSchema,
      default: () => ({ open: '09:00', close: '23:00', isOpen: true }),
    },
    sunday: {
      type: WorkingHoursSchema,
      default: () => ({ open: '09:00', close: '21:00', isOpen: true }),
    },
  },
  { _id: false },
);

// ─── Location Sub-Document ────────────────────────────────────────────────────
const LocationSchema = new Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    subCity: { type: String },
    woreda: { type: String },
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
  },
  { _id: false },
);

// ─── Delivery Settings Sub-Document ──────────────────────────────────────────
const DeliverySettingsSchema = new Schema(
  {
    minimumOrder: { type: Number, default: 50, min: 0 },
    deliveryFee: { type: Number, default: 30, min: 0 },
    freeDeliveryAbove: { type: Number },
    estimatedDeliveryTime: { type: Number, default: 30, min: 5 },
    maxDeliveryRadius: { type: Number, default: 10 },
    isDeliveryAvailable: { type: Boolean, default: true },
    isPickupAvailable: { type: Boolean, default: false },
  },
  { _id: false },
);

// ─── Rating Sub-Document ──────────────────────────────────────────────────────
const RatingSchema = new Schema(
  {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0, min: 0 },
    distribution: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 },
    },
  },
  { _id: false },
);

// ─── Bank Account Sub-Document ────────────────────────────────────────────────
const BankAccountSchema = new Schema(
  {
    bankName: { type: String },
    accountNumber: { type: String },
    accountHolderName: { type: String },
    telebirrNumber: { type: String },
    cbeBirrNumber: { type: String },
  },
  { _id: false },
);

// ─── Restaurant Document Interface ───────────────────────────────────────────
export interface IRestaurantDocument extends Document {
  name: string;
  nameAm?: string;
  slug: string;
  description?: string;
  descriptionAm?: string;
  owner: mongoose.Types.ObjectId;
  cuisineTypes: string[];
  logo?: string;
  logoPublicId?: string;
  coverImage?: string;
  coverImagePublicId?: string;
  images: string[];
  phone: string;
  email?: string;
  website?: string;
  location: {
    address: string;
    city: string;
    subCity?: string;
    woreda?: string;
    coordinates: { type: string; coordinates: number[] };
  };
  workingHours: Record<string, { open: string; close: string; isOpen: boolean }>;
  deliverySettings: {
    minimumOrder: number;
    deliveryFee: number;
    freeDeliveryAbove?: number;
    estimatedDeliveryTime: number;
    maxDeliveryRadius: number;
    isDeliveryAvailable: boolean;
    isPickupAvailable: boolean;
  };
  rating: {
    average: number;
    count: number;
    distribution: Record<string, number>;
  };
  status: RestaurantStatus;
  isOpen: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
  priceRange: 1 | 2 | 3 | 4;
  bankAccount?: {
    bankName?: string;
    accountNumber?: string;
    accountHolderName?: string;
    telebirrNumber?: string;
    cbeBirrNumber?: string;
  };
  rejectionReason?: string;
  verifiedAt?: Date;
  verifiedBy?: mongoose.Types.ObjectId;
  suspendedAt?: Date;
  suspendedBy?: mongoose.Types.ObjectId;
  suspensionReason?: string;
  totalOrders: number;
  totalRevenue: number;
  platformFeePercentage: number;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Restaurant Model Interface ───────────────────────────────────────────────
export interface IRestaurantModel extends Model<IRestaurantDocument> {
  findBySlug(slug: string): Promise<IRestaurantDocument | null>;
}

// ─── Restaurant Schema ────────────────────────────────────────────────────────
const RestaurantSchema = new Schema<IRestaurantDocument>(
  {
    name: {
      type: String,
      required: [true, 'Restaurant name is required'],
      trim: true,
      maxlength: [100, 'Restaurant name cannot exceed 100 characters'],
    },
    nameAm: { type: String, trim: true, maxlength: 100 },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String, maxlength: 1000 },
    descriptionAm: { type: String, maxlength: 1000 },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Restaurant owner is required'],
    },
    cuisineTypes: {
      type: [String],
      enum: Object.values(CuisineType),
      default: [],
    },
    logo: { type: String },
    logoPublicId: { type: String },
    coverImage: { type: String },
    coverImagePublicId: { type: String },
    images: { type: [String], default: [] },
    phone: {
      type: String,
      required: [true, 'Restaurant phone is required'],
    },
    email: { type: String, lowercase: true, trim: true },
    website: { type: String },
    location: {
      type: LocationSchema,
      required: [true, 'Restaurant location is required'],
    },
    workingHours: {
      type: ScheduleSchema,
      default: () => ({}),
    },
    deliverySettings: {
      type: DeliverySettingsSchema,
      default: () => ({}),
    },
    rating: {
      type: RatingSchema,
      default: () => ({}),
    },
    status: {
      type: String,
      enum: Object.values(RestaurantStatus),
      default: RestaurantStatus.PENDING,
    },
    isOpen: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
    priceRange: { type: Number, enum: [1, 2, 3, 4], default: 2 },
    bankAccount: { type: BankAccountSchema },
    rejectionReason: { type: String },
    verifiedAt: { type: Date },
    verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    suspendedAt: { type: Date },
    suspendedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    suspensionReason: { type: String },
    totalOrders: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    platformFeePercentage: { type: Number, default: 15 },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
RestaurantSchema.index({ slug: 1 }, { unique: true });
RestaurantSchema.index({ owner: 1 });
RestaurantSchema.index({ status: 1 });
RestaurantSchema.index({ isVerified: 1, isActive: 1 });
RestaurantSchema.index({ isFeatured: 1 });
RestaurantSchema.index({ 'location.city': 1 });
RestaurantSchema.index({ cuisineTypes: 1 });
RestaurantSchema.index({ 'rating.average': -1 });
RestaurantSchema.index({ createdAt: -1 });
RestaurantSchema.index({ 'location.coordinates': '2dsphere' }, { sparse: true });
RestaurantSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
});

// ─── Pre-Save Middleware ──────────────────────────────────────────────────────
RestaurantSchema.pre('save', function (next): void {
  if (this.isNew || this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

// ─── Static Methods ───────────────────────────────────────────────────────────
RestaurantSchema.statics.findBySlug = function (slug: string): Promise<IRestaurantDocument | null> {
  return this.findOne({ slug, deletedAt: { $exists: false } });
};

// ─── Export Model ─────────────────────────────────────────────────────────────
export const RestaurantModel =
  (mongoose.models['Restaurant'] as IRestaurantModel) ??
  mongoose.model<IRestaurantDocument, IRestaurantModel>('Restaurant', RestaurantSchema);

export default RestaurantModel;
