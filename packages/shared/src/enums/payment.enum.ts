// ─── Payment Method ───────────────────────────────────────────────────────────
// All supported payment methods on the Yene Delivery platform
export enum PaymentMethod {
  TELEBIRR = 'telebirr', // Ethio Telecom mobile money
  CHAPA = 'chapa', // Chapa payment gateway (card, bank)
  CBE_BIRR = 'cbe_birr', // Commercial Bank of Ethiopia mobile money
  CASH_ON_DELIVERY = 'cash_on_delivery', // Pay with cash when order arrives
}

// ─── Payment Status ───────────────────────────────────────────────────────────
// Tracks the current state of a payment transaction
export enum PaymentStatus {
  PENDING = 'pending', // Payment initiated but not yet processed
  PROCESSING = 'processing', // Payment is being processed by gateway
  COMPLETED = 'completed', // Payment successfully completed
  FAILED = 'failed', // Payment failed
  CANCELLED = 'cancelled', // Payment cancelled by user
  REFUNDED = 'refunded', // Full refund issued to customer
  PARTIALLY_REFUNDED = 'partially_refunded', // Partial refund issued
  EXPIRED = 'expired', // Payment session expired
  AWAITING_VERIFICATION = 'awaiting_verification', // Webhook not yet received
}

// ─── Transaction Type ─────────────────────────────────────────────────────────
// Defines the nature of a financial transaction
export enum TransactionType {
  PAYMENT = 'payment', // Customer paying for an order
  REFUND = 'refund', // Money returned to customer
  PAYOUT = 'payout', // Payment to restaurant or rider
  ADJUSTMENT = 'adjustment', // Manual adjustment by admin
  FEE = 'fee', // Platform service fee
}

// ─── Refund Reason ────────────────────────────────────────────────────────────
export enum RefundReason {
  ORDER_CANCELLED = 'order_cancelled',
  ORDER_REJECTED = 'order_rejected',
  FOOD_NOT_DELIVERED = 'food_not_delivered',
  WRONG_ORDER_DELIVERED = 'wrong_order_delivered',
  FOOD_QUALITY_ISSUE = 'food_quality_issue',
  DUPLICATE_PAYMENT = 'duplicate_payment',
  OVERCHARGED = 'overcharged',
  ADMIN_DECISION = 'admin_decision',
  OTHER = 'other',
}

// ─── Refund Status ────────────────────────────────────────────────────────────
export enum RefundStatus {
  PENDING = 'pending', // Refund requested but not yet processed
  PROCESSING = 'processing', // Refund being processed
  COMPLETED = 'completed', // Refund successfully sent to customer
  FAILED = 'failed', // Refund processing failed
  REJECTED = 'rejected', // Refund request rejected by admin
}

// ─── Payout Status ────────────────────────────────────────────────────────────
export enum PayoutStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  ON_HOLD = 'on_hold',
}

// ─── Payout Recipient ─────────────────────────────────────────────────────────
export enum PayoutRecipient {
  RESTAURANT = 'restaurant',
  RIDER = 'rider',
}

// ─── Currency ─────────────────────────────────────────────────────────────────
export enum Currency {
  ETB = 'ETB', // Ethiopian Birr — primary currency
  USD = 'USD', // US Dollar — future international support
}

// ─── Payment Gateway ──────────────────────────────────────────────────────────
export enum PaymentGateway {
  CHAPA = 'chapa',
  TELEBIRR = 'telebirr',
  CBE_BIRR = 'cbe_birr',
  INTERNAL = 'internal', // For cash on delivery and manual payments
}

// ─── Discount Type ────────────────────────────────────────────────────────────
export enum DiscountType {
  PERCENTAGE = 'percentage', // e.g. 10% off
  FIXED = 'fixed', // e.g. 50 ETB off
  FREE_DELIVERY = 'free_delivery', // Waives delivery fee
}

// ─── Coupon Status ────────────────────────────────────────────────────────────
export enum CouponStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired',
  EXHAUSTED = 'exhausted', // Max usage count reached
}

// ─── Wallet Transaction Type ──────────────────────────────────────────────────
export enum WalletTransactionType {
  CREDIT = 'credit', // Money added to wallet
  DEBIT = 'debit', // Money deducted from wallet
  REFUND = 'refund', // Refund credited to wallet
  WITHDRAWAL = 'withdrawal', // Rider or restaurant withdrawing earnings
}

// ─── Payment Sort By ──────────────────────────────────────────────────────────
export enum PaymentSortBy {
  CREATED_AT = 'createdAt',
  AMOUNT = 'amount',
  STATUS = 'status',
  METHOD = 'method',
}
