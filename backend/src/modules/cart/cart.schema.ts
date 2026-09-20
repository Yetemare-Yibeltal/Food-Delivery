import mongoose, { type Document, type Model, Schema } from 'mongoose';

// ─── Cart Item Sub-Document ───────────────────────────────────────────────────
const CartItemSchema = new Schema(
  {
    food: {
      type: Schema.Types.ObjectId,
      ref: 'Food',
      required: true,
    },
    name: { type: String, required: true },
    nameAm: { type: String },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    image: { type: String },
    addons: [
      {
        groupName: { type: String },
        optionName: { type: String },
        price: { type: Number, default: 0 },
      },
    ],
    specialInstructions: { type: String, maxlength: 200 },
    totalPrice: { type: Number, required: true, min: 0 },
  },
  { _id: true, timestamps: false },
);

// ─── Cart Document Interface ──────────────────────────────────────────────────
export interface ICartDocument extends Document {
  user: mongoose.Types.ObjectId;
  restaurant: mongoose.Types.ObjectId;
  restaurantName: string;
  items: mongoose.Types.DocumentArray<mongoose.Document>;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  appliedCoupon?: string;
  couponDiscount?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Cart Model Interface ─────────────────────────────────────────────────────
export interface ICartModel extends Model<ICartDocument> {}

// ─── Cart Schema ──────────────────────────────────────────────────────────────
const CartSchema = new Schema<ICartDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
    restaurantName: { type: String },
    items: { type: [CartItemSchema], default: [] },
    subtotal: { type: Number, default: 0, min: 0 },
    deliveryFee: { type: Number, default: 0, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    total: { type: Number, default: 0, min: 0 },
    appliedCoupon: { type: String },
    couponDiscount: { type: Number, default: 0, min: 0 },
    notes: { type: String, maxlength: 300 },
  },
  { timestamps: true },
);

CartSchema.index({ user: 1 }, { unique: true });

export const CartModel =
  (mongoose.models['Cart'] as ICartModel) ??
  mongoose.model<ICartDocument, ICartModel>('Cart', CartSchema);

export default CartModel;
