import type { OrderStatus, OrderType } from '../enums/order.enum';
import type { PaymentMethod, PaymentStatus } from '../enums/payment.enum';

// ─── Order Item Addon ─────────────────────────────────────────────────────────
export interface IOrderItemAddon {
  addonGroupId: string;
  addonGroupName: string;
  optionId: string;
  name: string;
  nameAm?: string;
  price: number;
}

// ─── Order Item ───────────────────────────────────────────────────────────────
export interface IOrderItem {
  food: string;
  name: string;
  nameAm?: string;
  image?: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
  addons: IOrderItemAddon[];
  itemTotal: number;
  note?: string;
}

// ─── Order Delivery Address ───────────────────────────────────────────────────
export interface IOrderAddress {
  label: string;
  recipientName: string;
  recipientPhone: string;
  street: string;
  specificLocation?: string;
  city: string;
  subCity?: string;
  woreda?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// ─── Order Payment ────────────────────────────────────────────────────────────
export interface IOrderPayment {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  transactionRef?: string;
  chapaCheckoutUrl?: string;
  telebirrCheckoutUrl?: string;
  gateway?: string;
  amount: number;
  currency: 'ETB';
  paidAt?: Date;
  failureReason?: string;
  refundedAt?: Date;
  refundAmount?: number;
  refundReason?: string;
  webhookVerified: boolean;
}

// ─── Order Status History ─────────────────────────────────────────────────────
export interface IOrderStatusHistory {
  status: OrderStatus;
  timestamp: Date;
  note?: string;
  updatedBy?: string;
  updatedByRole?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

// ─── Order Rating ─────────────────────────────────────────────────────────────
export interface IOrderRating {
  foodRating: number;
  deliveryRating: number;
  overallRating: number;
  comment?: string;
  images?: string[];
  ratedAt: Date;
}

// ─── Order Promo ─────────────────────────────────────────────────────────────
export interface IOrderPromo {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discountAmount: number;
}

// ─── Rider Location ───────────────────────────────────────────────────────────
export interface IRiderLocation {
  lat: number;
  lng: number;
  heading?: number;
  speed?: number;
  updatedAt: Date;
}

// ─── Main Order Interface ─────────────────────────────────────────────────────
export interface IOrder {
  _id: string;
  orderNumber: string;
  customer: string;
  customerName: string;
  customerPhone: string;
  customerAvatar?: string;
  restaurant: string;
  restaurantName: string;
  restaurantPhone: string;
  restaurantLogo?: string;
  restaurantAddress: IOrderAddress;
  rider?: string;
  riderName?: string;
  riderPhone?: string;
  riderAvatar?: string;
  riderLocation?: IRiderLocation;
  items: IOrderItem[];
  status: OrderStatus;
  statusHistory: IOrderStatusHistory[];
  type: OrderType;
  deliveryAddress: IOrderAddress;
  payment: IOrderPayment;
  promo?: IOrderPromo;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  serviceFee: number;
  total: number;
  note?: string;
  estimatedDeliveryTime?: number;
  estimatedPickupTime?: number;
  distanceKm?: number;
  acceptedAt?: Date;
  preparingAt?: Date;
  readyAt?: Date;
  pickedUpAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
  cancelledBy?: string;
  cancelledByRole?: string;
  rejectedAt?: Date;
  rejectionReason?: string;
  rating?: IOrderRating;
  isRated: boolean;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Cart Item Addon ──────────────────────────────────────────────────────────
export interface ICartItemAddon {
  addonGroupId: string;
  addonGroupName: string;
  optionId: string;
  name: string;
  nameAm?: string;
  price: number;
}

// ─── Cart Item ────────────────────────────────────────────────────────────────
export interface ICartItem {
  _id: string;
  food: string;
  name: string;
  nameAm?: string;
  image?: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
  addons: ICartItemAddon[];
  itemTotal: number;
  restaurantId: string;
  restaurantName: string;
  isAvailable: boolean;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface ICart {
  _id: string;
  customer: string;
  restaurant: string;
  restaurantName: string;
  restaurantLogo?: string;
  restaurantMinOrder: number;
  restaurantDeliveryFee: number;
  items: ICartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  serviceFee: number;
  total: number;
  promoCode?: string;
  promoDiscount?: number;
  itemCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Add To Cart DTO ──────────────────────────────────────────────────────────
export interface IAddToCartDTO {
  food: string;
  restaurantId: string;
  quantity: number;
  addons?: ICartItemAddon[];
  note?: string;
}

// ─── Update Cart Item DTO ─────────────────────────────────────────────────────
export interface IUpdateCartItemDTO {
  cartItemId: string;
  quantity: number;
  addons?: ICartItemAddon[];
}

// ─── Apply Promo DTO ──────────────────────────────────────────────────────────
export interface IApplyPromoDTO {
  code: string;
  restaurantId: string;
  orderTotal: number;
}

// ─── Create Order DTO ─────────────────────────────────────────────────────────
export interface ICreateOrderDTO {
  restaurant: string;
  items: {
    food: string;
    quantity: number;
    addons?: ICartItemAddon[];
    note?: string;
  }[];
  type: OrderType;
  deliveryAddress: IOrderAddress;
  paymentMethod: PaymentMethod;
  promoCode?: string;
  note?: string;
  scheduledFor?: Date;
}

// ─── Update Order Status DTO ──────────────────────────────────────────────────
export interface IUpdateOrderStatusDTO {
  status: OrderStatus;
  note?: string;
  estimatedTime?: number;
  rejectionReason?: string;
  cancellationReason?: string;
}

// ─── Rate Order DTO ───────────────────────────────────────────────────────────
export interface IRateOrderDTO {
  foodRating: number;
  deliveryRating: number;
  comment?: string;
  images?: string[];
}

// ─── Paginated Orders ─────────────────────────────────────────────────────────
export interface IPaginatedOrders {
  orders: IOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ─── Order Filters ────────────────────────────────────────────────────────────
export interface IOrderFilters {
  status?: OrderStatus;
  type?: OrderType;
  customer?: string;
  restaurant?: string;
  rider?: string;
  isPaid?: boolean;
  isRated?: boolean;
  startDate?: Date;
  endDate?: Date;
  city?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'total' | 'status';
  sortOrder?: 'asc' | 'desc';
}

// ─── Payment Initialize DTO ───────────────────────────────────────────────────
export interface IInitializePaymentDTO {
  orderId: string;
  method: PaymentMethod;
  returnUrl?: string;
  cancelUrl?: string;
}

// ─── Payment Verify DTO ───────────────────────────────────────────────────────
export interface IVerifyPaymentDTO {
  orderId: string;
  transactionId: string;
  method: PaymentMethod;
}

// ─── Payment Response ─────────────────────────────────────────────────────────
export interface IPaymentResponse {
  success: boolean;
  checkoutUrl?: string;
  transactionId?: string;
  message: string;
  data?: Record<string, unknown>;
}

// ─── Rider Info ───────────────────────────────────────────────────────────────
export interface IRiderInfo {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  rating: number;
  totalDeliveries: number;
  vehicleType: string;
  plateNumber: string;
  isOnline: boolean;
  currentLocation?: IRiderLocation;
}

// ─── Delivery Tracking ────────────────────────────────────────────────────────
export interface IDeliveryTracking {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  statusHistory: IOrderStatusHistory[];
  rider?: IRiderInfo;
  riderLocation?: IRiderLocation;
  restaurantAddress: IOrderAddress;
  deliveryAddress: IOrderAddress;
  estimatedDeliveryTime?: number;
  distanceKm?: number;
  pickedUpAt?: Date;
  estimatedArrival?: Date;
}

// ─── Update Rider Location DTO ────────────────────────────────────────────────
export interface IUpdateRiderLocationDTO {
  lat: number;
  lng: number;
  heading?: number;
  speed?: number;
}

// ─── Admin Order Analytics ────────────────────────────────────────────────────
export interface IOrderAnalytics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  completedOrders: number;
  cancelledOrders: number;
  pendingOrders: number;
  activeOrders: number;
  ordersByCity: IOrdersByCity[];
  ordersByPaymentMethod: IOrdersByPaymentMethod[];
  revenueByDay: IRevenueByDay[];
  topRestaurants: ITopRestaurant[];
}

// ─── Orders By City ───────────────────────────────────────────────────────────
export interface IOrdersByCity {
  city: string;
  count: number;
  revenue: number;
}

// ─── Orders By Payment Method ─────────────────────────────────────────────────
export interface IOrdersByPaymentMethod {
  method: PaymentMethod;
  count: number;
  revenue: number;
}

// ─── Revenue By Day ───────────────────────────────────────────────────────────
export interface IRevenueByDay {
  date: string;
  revenue: number;
  orders: number;
}

// ─── Top Restaurant ───────────────────────────────────────────────────────────
export interface ITopRestaurant {
  restaurant: string;
  name: string;
  logo?: string;
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
}

// ─── Notification ─────────────────────────────────────────────────────────────
export interface INotification {
  _id: string;
  recipient: string;
  recipientRole: string;
  type: NotificationType;
  title: string;
  titleAm?: string;
  message: string;
  messageAm?: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

// ─── Notification Type ────────────────────────────────────────────────────────
export enum NotificationType {
  ORDER_PLACED = 'order_placed',
  ORDER_CONFIRMED = 'order_confirmed',
  ORDER_PREPARING = 'order_preparing',
  ORDER_READY = 'order_ready',
  ORDER_PICKED_UP = 'order_picked_up',
  ORDER_DELIVERED = 'order_delivered',
  ORDER_CANCELLED = 'order_cancelled',
  ORDER_REJECTED = 'order_rejected',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILED = 'payment_failed',
  PROMO_APPLIED = 'promo_applied',
  NEW_ORDER = 'new_order',
  RIDER_ASSIGNED = 'rider_assigned',
  ACCOUNT_VERIFIED = 'account_verified',
  ACCOUNT_SUSPENDED = 'account_suspended',
  RESTAURANT_APPROVED = 'restaurant_approved',
  RESTAURANT_REJECTED = 'restaurant_rejected',
}

// ─── Paginated Notifications ──────────────────────────────────────────────────
export interface IPaginatedNotifications {
  notifications: INotification[];
  total: number;
  unreadCount: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ─── Coupon ───────────────────────────────────────────────────────────────────
export interface ICoupon {
  _id: string;
  code: string;
  description: string;
  descriptionAm?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscountAmount?: number;
  minOrderAmount: number;
  maxUsageCount: number;
  usageCount: number;
  maxUsagePerUser: number;
  applicableRestaurants?: string[];
  applicableCities?: string[];
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Create Coupon DTO ────────────────────────────────────────────────────────
export interface ICreateCouponDTO {
  code: string;
  description: string;
  descriptionAm?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscountAmount?: number;
  minOrderAmount: number;
  maxUsageCount: number;
  maxUsagePerUser: number;
  applicableRestaurants?: string[];
  applicableCities?: string[];
  startDate: Date;
  endDate: Date;
}
