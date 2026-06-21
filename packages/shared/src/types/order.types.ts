import type { OrderStatus, OrderType } from '../enums/order.enum';
import type { PaymentMethod, PaymentStatus } from '../enums/payment.enum';

export interface IOrder {
  _id: string;
  customer: string;
  restaurant: string;
  rider?: string;
  items: IOrderItem[];
  status: OrderStatus;
  type: OrderType;
  deliveryAddress: IOrderAddress;
  payment: IOrderPayment;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  note?: string;
  estimatedDeliveryTime?: number;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  food: string;
  name: string;
  price: number;
  quantity: number;
  addons?: IOrderItemAddon[];
}

export interface IOrderItemAddon {
  name: string;
  price: number;
}

export interface IOrderAddress {
  street: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface IOrderPayment {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  paidAt?: Date;
}

export interface ICartItem {
  food: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  addons?: IOrderItemAddon[];
}
