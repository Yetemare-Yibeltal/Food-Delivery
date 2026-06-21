// ─── App Info ─────────────────────────────────────────────────────────────────
export const APP_INFO = {
  NAME: 'Yene Delivery',
  NAME_AM: 'የኔ ዴሊቨሪ',
  TAGLINE: 'Food delivered fast across Ethiopia',
  TAGLINE_AM: 'ምግብ በፍጥነት በመላው ኢትዮጵያ',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@yenedelivery.et',
  SUPPORT_PHONE: '+251911000000',
  WEBSITE: 'https://yenedelivery.et',
  ANDROID_APP_URL: 'https://play.google.com/store/apps/yenedelivery',
  IOS_APP_URL: 'https://apps.apple.com/app/yenedelivery',
  FACEBOOK_URL: 'https://facebook.com/yenedelivery',
  INSTAGRAM_URL: 'https://instagram.com/yenedelivery',
  TELEGRAM_URL: 'https://t.me/yenedelivery',
} as const;

// ─── Currency ─────────────────────────────────────────────────────────────────
export const CURRENCY = {
  CODE: 'ETB',
  SYMBOL: 'ብር',
  SYMBOL_EN: 'ETB',
  DECIMAL_PLACES: 2,
  THOUSANDS_SEPARATOR: ',',
  DECIMAL_SEPARATOR: '.',
} as const;

// ─── Supported Languages ──────────────────────────────────────────────────────
export const LANGUAGES = {
  DEFAULT: 'en',
  SUPPORTED: ['en', 'am'] as const,
  LABELS: {
    en: 'English',
    am: 'አማርኛ',
  },
} as const;

// ─── Pagination ───────────────────────────────────────────────────────────────
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  RESTAURANT_LIMIT: 12,
  FOOD_LIMIT: 20,
  ORDER_LIMIT: 10,
  NOTIFICATION_LIMIT: 20,
  REVIEW_LIMIT: 10,
  ADMIN_LIMIT: 20,
} as const;

// ─── File Upload ──────────────────────────────────────────────────────────────
export const FILE_UPLOAD = {
  MAX_SIZE_MB: 5,
  MAX_SIZE_BYTES: 5 * 1024 * 1024,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'] as const,
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'] as const,
  MAX_IMAGES_PER_FOOD: 5,
  MAX_IMAGES_PER_RESTAURANT: 10,
  CLOUDINARY_FOLDERS: {
    AVATARS: 'yene-delivery/avatars',
    RESTAURANTS: 'yene-delivery/restaurants',
    FOODS: 'yene-delivery/foods',
    REVIEWS: 'yene-delivery/reviews',
    LICENSES: 'yene-delivery/licenses',
    CATEGORIES: 'yene-delivery/categories',
  },
} as const;

// ─── Authentication ───────────────────────────────────────────────────────────
export const AUTH = {
  ACCESS_TOKEN_EXPIRES: '15m',
  REFRESH_TOKEN_EXPIRES: '7d',
  ACCESS_TOKEN_EXPIRES_MS: 15 * 60 * 1000,
  REFRESH_TOKEN_EXPIRES_MS: 7 * 24 * 60 * 60 * 1000,
  BCRYPT_SALT_ROUNDS: 12,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCK_TIME_MINUTES: 30,
  PASSWORD_RESET_EXPIRES_MINUTES: 60,
  EMAIL_VERIFICATION_EXPIRES_HOURS: 24,
} as const;

// ─── OTP ──────────────────────────────────────────────────────────────────────
export const OTP = {
  LENGTH: 6,
  EXPIRES_IN_MINUTES: 10,
  EXPIRES_IN_MS: 10 * 60 * 1000,
  MAX_ATTEMPTS: 3,
  RESEND_COOLDOWN_SECONDS: 60,
  MAX_RESEND_COUNT: 5,
} as const;

// ─── Order ────────────────────────────────────────────────────────────────────
export const ORDER = {
  MIN_ORDER_AMOUNT_ETB: 50,
  MAX_ITEMS_PER_ORDER: 50,
  MAX_QUANTITY_PER_ITEM: 20,
  AUTO_CANCEL_MINUTES: 15,
  AUTO_COMPLETE_HOURS: 24,
  MAX_SCHEDULED_DAYS_AHEAD: 7,
  RATING_WINDOW_HOURS: 48,
  SERVICE_FEE_PERCENTAGE: 0.05,
  MAX_SERVICE_FEE_ETB: 50,
  MIN_SERVICE_FEE_ETB: 5,
} as const;

// ─── Delivery ─────────────────────────────────────────────────────────────────
export const DELIVERY = {
  MAX_RADIUS_KM: 15,
  MIN_RADIUS_KM: 0.5,
  BASE_FEE_ETB: 30,
  FEE_PER_KM_ETB: 5,
  MAX_FEE_ETB: 150,
  MIN_FEE_ETB: 20,
  FREE_DELIVERY_THRESHOLD_ETB: 500,
  ESTIMATED_SPEED_KMH: 25,
  PREPARATION_BUFFER_MINUTES: 5,
  RIDER_ASSIGNMENT_TIMEOUT_SECONDS: 30,
  MAX_RIDER_ASSIGNMENT_ATTEMPTS: 3,
} as const;

// ─── Rate Limiting ────────────────────────────────────────────────────────────
export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000,
  MAX_REQUESTS: 100,
  AUTH_WINDOW_MS: 15 * 60 * 1000,
  AUTH_MAX_REQUESTS: 10,
  OTP_WINDOW_MS: 60 * 60 * 1000,
  OTP_MAX_REQUESTS: 5,
  PAYMENT_WINDOW_MS: 60 * 60 * 1000,
  PAYMENT_MAX_REQUESTS: 20,
} as const;

// ─── Ethiopian Phone ──────────────────────────────────────────────────────────
export const ETHIOPIAN_PHONE = {
  REGEX: /^(\+251|0)(9|7)\d{8}$/,
  FORMAT: '+251XXXXXXXXX',
  EXAMPLE: '+251912345678',
  PREFIX_INTERNATIONAL: '+251',
  PREFIX_LOCAL: '0',
  TELEBIRR_PREFIX: '09',
  VALID_PREFIXES: ['09', '07', '+2519', '+2517'] as const,
} as const;

// ─── Platform Fees ────────────────────────────────────────────────────────────
export const PLATFORM_FEES = {
  RESTAURANT_COMMISSION_PERCENTAGE: 0.15,
  RIDER_COMMISSION_PERCENTAGE: 0.1,
  PAYMENT_GATEWAY_FEE_PERCENTAGE: 0.02,
  CHAPA_FEE_PERCENTAGE: 0.0195,
  TELEBIRR_FEE_PERCENTAGE: 0.01,
  CBE_FEE_PERCENTAGE: 0.01,
} as const;

// ─── Notification ─────────────────────────────────────────────────────────────
export const NOTIFICATION = {
  MAX_UNREAD: 100,
  CLEANUP_DAYS: 90,
  BATCH_SIZE: 100,
} as const;

// ─── Cache TTL ────────────────────────────────────────────────────────────────
export const CACHE_TTL = {
  RESTAURANTS_SECONDS: 300,
  FOODS_SECONDS: 300,
  CATEGORIES_SECONDS: 600,
  USER_SECONDS: 60,
  ORDER_SECONDS: 30,
  ANALYTICS_SECONDS: 3600,
} as const;

// ─── Socket Events ────────────────────────────────────────────────────────────
export const SOCKET_EVENTS = {
  // Connection
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',

  // Order Events
  ORDER_PLACED: 'order:placed',
  ORDER_CONFIRMED: 'order:confirmed',
  ORDER_PREPARING: 'order:preparing',
  ORDER_READY: 'order:ready',
  ORDER_PICKED_UP: 'order:picked_up',
  ORDER_ON_THE_WAY: 'order:on_the_way',
  ORDER_DELIVERED: 'order:delivered',
  ORDER_CANCELLED: 'order:cancelled',
  ORDER_REJECTED: 'order:rejected',

  // Rider Events
  RIDER_LOCATION_UPDATE: 'rider:location_update',
  RIDER_ASSIGNED: 'rider:assigned',
  RIDER_ONLINE: 'rider:online',
  RIDER_OFFLINE: 'rider:offline',

  // Notification Events
  NOTIFICATION_NEW: 'notification:new',
  NOTIFICATION_READ: 'notification:read',

  // Restaurant Events
  RESTAURANT_NEW_ORDER: 'restaurant:new_order',
  RESTAURANT_OPEN: 'restaurant:open',
  RESTAURANT_CLOSE: 'restaurant:close',
} as const;

// ─── HTTP Status Codes ────────────────────────────────────────────────────────
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// ─── Error Messages ───────────────────────────────────────────────────────────
export const ERROR_MESSAGES = {
  // Auth
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_NOT_VERIFIED: 'Please verify your email before logging in',
  ACCOUNT_SUSPENDED: 'Your account has been suspended. Contact support.',
  ACCOUNT_INACTIVE: 'Your account is inactive. Please contact support.',
  TOKEN_EXPIRED: 'Your session has expired. Please login again.',
  TOKEN_INVALID: 'Invalid token. Please login again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  TOO_MANY_ATTEMPTS: 'Too many attempts. Please try again later.',

  // User
  USER_NOT_FOUND: 'User not found.',
  EMAIL_ALREADY_EXISTS: 'An account with this email already exists.',
  PHONE_ALREADY_EXISTS: 'An account with this phone number already exists.',

  // Restaurant
  RESTAURANT_NOT_FOUND: 'Restaurant not found.',
  RESTAURANT_CLOSED: 'This restaurant is currently closed.',
  RESTAURANT_NOT_VERIFIED: 'This restaurant is not yet verified.',

  // Food
  FOOD_NOT_FOUND: 'Food item not found.',
  FOOD_UNAVAILABLE: 'This food item is currently unavailable.',

  // Order
  ORDER_NOT_FOUND: 'Order not found.',
  ORDER_CANNOT_BE_CANCELLED: 'This order can no longer be cancelled.',
  MIN_ORDER_NOT_MET: 'Minimum order amount not met.',
  CART_EMPTY: 'Your cart is empty.',
  CART_RESTAURANT_MISMATCH: 'All items must be from the same restaurant.',

  // Payment
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  PAYMENT_ALREADY_COMPLETED: 'This order has already been paid.',

  // General
  INTERNAL_SERVER_ERROR: 'Something went wrong. Please try again.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Validation failed. Please check your input.',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed limit.',
  INVALID_FILE_TYPE: 'Invalid file type. Only images are allowed.',
} as const;

// ─── Success Messages ─────────────────────────────────────────────────────────
export const SUCCESS_MESSAGES = {
  // Auth
  REGISTER_SUCCESS: 'Account created successfully. Please verify your email.',
  LOGIN_SUCCESS: 'Logged in successfully.',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  EMAIL_VERIFIED: 'Email verified successfully.',
  PASSWORD_RESET_EMAIL_SENT: 'Password reset email sent. Please check your inbox.',
  PASSWORD_RESET_SUCCESS: 'Password reset successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  OTP_SENT: 'OTP sent successfully.',
  OTP_VERIFIED: 'OTP verified successfully.',

  // User
  PROFILE_UPDATED: 'Profile updated successfully.',
  AVATAR_UPDATED: 'Profile picture updated successfully.',
  ADDRESS_ADDED: 'Address added successfully.',
  ADDRESS_UPDATED: 'Address updated successfully.',
  ADDRESS_DELETED: 'Address deleted successfully.',
  PREFERENCES_UPDATED: 'Preferences updated successfully.',

  // Restaurant
  RESTAURANT_CREATED: 'Restaurant created successfully. Pending verification.',
  RESTAURANT_UPDATED: 'Restaurant updated successfully.',
  RESTAURANT_VERIFIED: 'Restaurant verified successfully.',

  // Food
  FOOD_CREATED: 'Food item created successfully.',
  FOOD_UPDATED: 'Food item updated successfully.',
  FOOD_DELETED: 'Food item deleted successfully.',

  // Order
  ORDER_PLACED: 'Order placed successfully.',
  ORDER_CANCELLED: 'Order cancelled successfully.',
  ORDER_RATED: 'Thank you for your rating.',

  // Cart
  CART_ITEM_ADDED: 'Item added to cart.',
  CART_ITEM_UPDATED: 'Cart updated successfully.',
  CART_ITEM_REMOVED: 'Item removed from cart.',
  CART_CLEARED: 'Cart cleared successfully.',

  // Payment
  PAYMENT_SUCCESS: 'Payment completed successfully.',
  REFUND_INITIATED: 'Refund initiated successfully.',

  // General
  DELETED_SUCCESS: 'Deleted successfully.',
  UPDATED_SUCCESS: 'Updated successfully.',
} as const;

// ─── Regex Patterns ───────────────────────────────────────────────────────────
export const REGEX = {
  ETHIOPIAN_PHONE: /^(\+251|0)(9|7)\d{8}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
  OTP: /^\d{6}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  ETHIOPIAN_NAME: /^[a-zA-ZÀ-ÿ\u1200-\u137F\s'-]+$/,
  PLATE_NUMBER: /^[A-Z]{2}\d{5}$/,
  LICENSE_NUMBER: /^[A-Z0-9]{6,20}$/,
} as const;
