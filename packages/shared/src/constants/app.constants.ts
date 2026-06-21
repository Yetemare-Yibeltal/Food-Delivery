export const APP_CONSTANTS = {
  APP_NAME: 'Yene Delivery',
  APP_NAME_AM: 'የኔ ዴሊቨሪ',
  CURRENCY: 'ETB',
  CURRENCY_SYMBOL: 'ብር',
  DEFAULT_LANGUAGE: 'en',
  SUPPORTED_LANGUAGES: ['en', 'am'],

  // Pagination
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,

  // File uploads
  MAX_FILE_SIZE_MB: 5,
  MAX_FILE_SIZE_BYTES: 5 * 1024 * 1024,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],

  // Order
  MIN_ORDER_AMOUNT: 50,
  MAX_DELIVERY_RADIUS_KM: 15,

  // OTP
  OTP_EXPIRES_IN_MINUTES: 10,
  OTP_LENGTH: 6,

  // Token
  ACCESS_TOKEN_EXPIRES: '15m',
  REFRESH_TOKEN_EXPIRES: '7d',
} as const;
