export enum PaymentMethod {
  TELEBIRR = 'telebirr',
  CHAPA = 'chapa',
  CBE_BIRR = 'cbe_birr',
  CASH_ON_DELIVERY = 'cash_on_delivery',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled',
}
