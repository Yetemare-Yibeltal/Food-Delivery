// ─── Order Status ─────────────────────────────────────────────────────────────
// Represents every stage an order goes through from placement to completion.
export enum OrderStatus {
  PENDING = 'pending', // Customer placed order, waiting for restaurant
  CONFIRMED = 'confirmed', // Restaurant accepted the order
  PREPARING = 'preparing', // Restaurant is preparing the food
  READY_FOR_PICKUP = 'ready_for_pickup', // Food is ready, waiting for rider
  PICKED_UP = 'picked_up', // Rider picked up the food
  ON_THE_WAY = 'on_the_way', // Rider is on the way to customer
  DELIVERED = 'delivered', // Order successfully delivered
  CANCELLED = 'cancelled', // Order cancelled by customer or admin
  REJECTED = 'rejected', // Order rejected by restaurant
  REFUNDED = 'refunded', // Payment refunded to customer
  FAILED = 'failed', // Order failed due to payment or system error
}

// ─── Order Type ───────────────────────────────────────────────────────────────
export enum OrderType {
  DELIVERY = 'delivery', // Customer wants food delivered to their address
  PICKUP = 'pickup', // Customer will pick up from restaurant
}

// ─── Order Cancel Reason ──────────────────────────────────────────────────────
export enum OrderCancelReason {
  CUSTOMER_CHANGED_MIND = 'customer_changed_mind',
  CUSTOMER_DUPLICATE_ORDER = 'customer_duplicate_order',
  CUSTOMER_WRONG_ADDRESS = 'customer_wrong_address',
  CUSTOMER_PAYMENT_ISSUE = 'customer_payment_issue',
  RESTAURANT_CLOSED = 'restaurant_closed',
  RESTAURANT_ITEM_UNAVAILABLE = 'restaurant_item_unavailable',
  RESTAURANT_TOO_BUSY = 'restaurant_too_busy',
  RIDER_NOT_AVAILABLE = 'rider_not_available',
  ADMIN_FRAUD_DETECTED = 'admin_fraud_detected',
  ADMIN_POLICY_VIOLATION = 'admin_policy_violation',
  OTHER = 'other',
}

// ─── Order Reject Reason ──────────────────────────────────────────────────────
export enum OrderRejectReason {
  ITEM_UNAVAILABLE = 'item_unavailable',
  RESTAURANT_CLOSED = 'restaurant_closed',
  TOO_BUSY = 'too_busy',
  OUT_OF_DELIVERY_RANGE = 'out_of_delivery_range',
  MINIMUM_ORDER_NOT_MET = 'minimum_order_not_met',
  OTHER = 'other',
}

// ─── Order Sort Options ───────────────────────────────────────────────────────
export enum OrderSortBy {
  CREATED_AT = 'createdAt',
  TOTAL = 'total',
  STATUS = 'status',
  DELIVERY_TIME = 'estimatedDeliveryTime',
}

// ─── Order Time Filter ────────────────────────────────────────────────────────
export enum OrderTimeFilter {
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  LAST_7_DAYS = 'last_7_days',
  LAST_30_DAYS = 'last_30_days',
  THIS_MONTH = 'this_month',
  LAST_MONTH = 'last_month',
  CUSTOM = 'custom',
}

// ─── Rider Assignment Status ──────────────────────────────────────────────────
export enum RiderAssignmentStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

// ─── Delivery Status ──────────────────────────────────────────────────────────
export enum DeliveryStatus {
  WAITING_FOR_RIDER = 'waiting_for_rider',
  RIDER_ASSIGNED = 'rider_assigned',
  RIDER_HEADING_TO_RESTAURANT = 'rider_heading_to_restaurant',
  RIDER_AT_RESTAURANT = 'rider_at_restaurant',
  RIDER_HEADING_TO_CUSTOMER = 'rider_heading_to_customer',
  RIDER_AT_CUSTOMER = 'rider_at_customer',
  DELIVERED = 'delivered',
  FAILED = 'failed',
}
