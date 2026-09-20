import mongoose, { type Document, type Model, Schema } from 'mongoose';

// ─── Addon Option Sub-Document ────────────────────────────────────────────────
const AddonOptionSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    nameAm: { type: String, maxlength: 50 },
    price: { type: Number, required: true, min: 0 },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true },
);

// ─── Addon Group Sub-Document ─────────────────────────────────────────────────
const AddonGroupSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    nameAm: { type: String, maxlength: 100 },
    isRequired: { type: Boolean, default: false },
    minSelect: { type: Number, default: 0, min: 0 },
    maxSelect: { type: Number, default: 1, min: 1 },
    options: { type: [AddonOptionSchema], default: [] },
  },
  { _id: true },
);

// ─── Food Document Interface ──────────────────────────────────────────────────
export interface IFoodDocument extends Document {
  name: string;
  nameAm?: string;
  description?: string;
  descriptionAm?: string;
  price: number;
  discountedPrice?: number;
  restaurant: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  image?: string;
  imagePublicId?: string;
  images: string[];
  isAvailable: boolean;
  isPopular: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isSpicy: boolean;
  isGlutenFree: boolean;
  calories?: number;
  preparationTime?: number;
  addonGroups: mongoose.Types.DocumentArray<mongoose.Document>;
  tags: string[];
  totalOrders: number;
  rating: { average: number; count: number };
  sortOrder: number;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Food Model Interface ─────────────────────────────────────────────────────
export interface IFoodModel extends Model<IFoodDocument> {}

// ─── Food Schema ──────────────────────────────────────────────────────────────
const FoodSchema = new Schema<IFoodDocument>(
  {
    name: {
      type: String,
      required: [true, 'Food name is required'],
      trim: true,
      maxlength: [100, 'Food name cannot exceed 100 characters'],
    },
    nameAm: { type: String, trim: true, maxlength: 100 },
    description: { type: String, maxlength: 500 },
    descriptionAm: { type: String, maxlength: 500 },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    discountedPrice: {
      type: Number,
      min: [0, 'Discounted price cannot be negative'],
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: [true, 'Restaurant is required'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'FoodCategory',
      required: [true, 'Category is required'],
    },
    image: { type: String },
    imagePublicId: { type: String },
    images: { type: [String], default: [] },
    isAvailable: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
    isVegetarian: { type: Boolean, default: false },
    isVegan: { type: Boolean, default: false },
    isSpicy: { type: Boolean, default: false },
    isGlutenFree: { type: Boolean, default: false },
    calories: { type: Number, min: 0 },
    preparationTime: { type: Number, min: 1 },
    addonGroups: { type: [AddonGroupSchema], default: [] },
    tags: { type: [String], default: [] },
    totalOrders: { type: Number, default: 0 },
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
    sortOrder: { type: Number, default: 0 },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
FoodSchema.index({ restaurant: 1 });
FoodSchema.index({ category: 1 });
FoodSchema.index({ isAvailable: 1 });
FoodSchema.index({ isPopular: 1 });
FoodSchema.index({ price: 1 });
FoodSchema.index({ totalOrders: -1 });
FoodSchema.index({ name: 'text', description: 'text', tags: 'text' });

// ─── Export Model ─────────────────────────────────────────────────────────────
export const FoodModel =
  (mongoose.models['Food'] as IFoodModel) ??
  mongoose.model<IFoodDocument, IFoodModel>('Food', FoodSchema);

export default FoodModel;
