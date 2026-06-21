import type { OrderStatus, OrderType } from '../enums/order.enum';
import type { PaymentMethod, PaymentStatus } from '../enums/payment.enum';

// ─── Order Item Addon ─────────────────────────────────────────────────────────
export interface IOrderItemAddon {
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
  quantity: number;
  addons: IOrderItemAddon[];
  itemTotal: number;
}

// ─── Order Delivery Address ───────────────────────────────────────────────────
export interface IOrderAddress {
  label: string;
  street: string;
  city: string;
  specificLocation?: string;
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
  gateway?: string;
  paidAt?: Date;
  failureReason?: string;
  refundedAt?: Date;
  refundAmount?: number;
}

// ─── Order Status History ─────────────────────────────────────────────────────
export interface IOrderStatusHistory {
  status: OrderStatus;
  timestamp: Date;
  note?: string;
  updatedBy?: string;
}

// ─── Order Rating ─────────────────────────────────────────────────────────────
export interface IOrderRating {
  foodRating: number;
  deliveryRating: number;
  comment?: string;
  ratedAt: Date;
}

// ─── Order ────────────────────────────────────────────────────────────────────
export interface IOrder {
  _id: string;
  orderNumber: string;
  customer: string;
  restaurant: string;
  restaurantName: string;
  restaurantLogo?: string;
  rider?: string;
  riderName?: string;
  riderPhone?: string;
  items: IOrderItem[];
  status: OrderStatus;
  statusHistory: IOrderStatusHistory[];
  type: OrderType;
  deliveryAddress: IOrderAddress;
  payment: IOrderPayment;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  note?: string;
  estimatedDeliveryTime?: number;
  estimatedPickupTime?: number;
  acceptedAt?: Date;
  preparingAt?: Date;
  readyAt?: Date;
  pickedUpAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
  rating?: IOrderRating;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Cart Item ────────────────────────────────────────────────────────────────
export interface ICartItem {
  food: string;
  restaurantId: string;
  name: string;
  nameAm?: string;
  price: number;
  quantity: number;
  image?: string;
  addons: IOrderItemAddon[];
  itemTotal: number;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface ICart {
  _id: string;
  customer: string;
  restaurant: string;
  items: ICartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  couponCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Pagination ───────────────────────────────────────────────────────────────
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
  startDate?: Date;
  endDate?: Date;
  restaurant?: string;
  customer?: string;
  rider?: string;
  page?: number;
  limit?: number;
}
