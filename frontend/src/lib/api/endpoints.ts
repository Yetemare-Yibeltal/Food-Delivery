// ─── API Endpoints ────────────────────────────────────────────────────────────
export const ENDPOINTS = {
  // ─── Auth ────────────────────────────────────────────────────────────────
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    VERIFY_OTP: '/auth/verify-otp',
    RESEND_OTP: '/auth/resend-otp',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    DELETE_ACCOUNT: '/auth/account',
  },

  // ─── Users ───────────────────────────────────────────────────────────────
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    UPDATE_AVATAR: '/users/avatar',
    ADDRESSES: '/users/addresses',
    ADD_ADDRESS: '/users/addresses',
    UPDATE_ADDRESS: (id: string) => `/users/addresses/${id}`,
    DELETE_ADDRESS: (id: string) => `/users/addresses/${id}`,
    SET_DEFAULT_ADDRESS: (id: string) => `/users/addresses/${id}/default`,
    PREFERENCES: '/users/preferences',
    STATS: '/users/stats',
    ORDER_HISTORY: '/users/orders',
    FAVOURITES: '/users/favourites',
    ADD_FAVOURITE: (restaurantId: string) => `/users/favourites/${restaurantId}`,
    REMOVE_FAVOURITE: (restaurantId: string) => `/users/favourites/${restaurantId}`,
  },

  // ─── Restaurants ─────────────────────────────────────────────────────────
  RESTAURANTS: {
    LIST: '/restaurants',
    DETAIL: (id: string) => `/restaurants/${id}`,
    NEARBY: '/restaurants/nearby',
    FEATURED: '/restaurants/featured',
    SEARCH: '/restaurants/search',
    REVIEWS: (id: string) => `/restaurants/${id}/reviews`,
    MENU: (id: string) => `/restaurants/${id}/menu`,
    CATEGORIES: (id: string) => `/restaurants/${id}/categories`,
    // Restaurant Owner
    MY_RESTAURANT: '/restaurants/my',
    CREATE: '/restaurants',
    UPDATE: (id: string) => `/restaurants/${id}`,
    UPDATE_LOGO: (id: string) => `/restaurants/${id}/logo`,
    UPDATE_COVER: (id: string) => `/restaurants/${id}/cover`,
    UPDATE_HOURS: (id: string) => `/restaurants/${id}/hours`,
    UPDATE_SETTINGS: (id: string) => `/restaurants/${id}/settings`,
    TOGGLE_STATUS: (id: string) => `/restaurants/${id}/status`,
    DASHBOARD: (id: string) => `/restaurants/${id}/dashboard`,
  },

  // ─── Foods ───────────────────────────────────────────────────────────────
  FOODS: {
    LIST: '/foods',
    DETAIL: (id: string) => `/foods/${id}`,
    CREATE: '/foods',
    UPDATE: (id: string) => `/foods/${id}`,
    DELETE: (id: string) => `/foods/${id}`,
    UPDATE_IMAGE: (id: string) => `/foods/${id}/image`,
    TOGGLE_AVAILABILITY: (id: string) => `/foods/${id}/availability`,
    CATEGORIES: '/foods/categories',
    CREATE_CATEGORY: '/foods/categories',
    UPDATE_CATEGORY: (id: string) => `/foods/categories/${id}`,
    DELETE_CATEGORY: (id: string) => `/foods/categories/${id}`,
  },

  // ─── Cart ─────────────────────────────────────────────────────────────────
  CART: {
    GET: '/cart',
    ADD: '/cart/items',
    UPDATE: (itemId: string) => `/cart/items/${itemId}`,
    REMOVE: (itemId: string) => `/cart/items/${itemId}`,
    CLEAR: '/cart',
    APPLY_PROMO: '/cart/promo',
    REMOVE_PROMO: '/cart/promo',
  },

  // ─── Orders ───────────────────────────────────────────────────────────────
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    CREATE: '/orders',
    CANCEL: (id: string) => `/orders/${id}/cancel`,
    RATE: (id: string) => `/orders/${id}/rate`,
    ACTIVE: '/orders/active',
    HISTORY: '/orders/history',
    REORDER: (id: string) => `/orders/${id}/reorder`,
    // Restaurant
    RESTAURANT_ORDERS: '/orders/restaurant',
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
    // Rider
    RIDER_ORDERS: '/orders/rider',
    ASSIGN_RIDER: (id: string) => `/orders/${id}/assign-rider`,
  },

  // ─── Payments ─────────────────────────────────────────────────────────────
  PAYMENTS: {
    INITIALIZE: '/payments/initialize',
    VERIFY: '/payments/verify',
    WEBHOOK_CHAPA: '/payments/webhook/chapa',
    WEBHOOK_TELEBIRR: '/payments/webhook/telebirr',
    WEBHOOK_CBE: '/payments/webhook/cbe',
    HISTORY: '/payments/history',
    REFUND: (id: string) => `/payments/${id}/refund`,
  },

  // ─── Tracking ─────────────────────────────────────────────────────────────
  TRACKING: {
    ORDER: (orderId: string) => `/tracking/${orderId}`,
    UPDATE_LOCATION: '/tracking/location',
  },

  // ─── Notifications ────────────────────────────────────────────────────────
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    DELETE: (id: string) => `/notifications/${id}`,
    UNREAD_COUNT: '/notifications/unread-count',
  },

  // ─── Reviews ──────────────────────────────────────────────────────────────
  REVIEWS: {
    CREATE: '/reviews',
    UPDATE: (id: string) => `/reviews/${id}`,
    DELETE: (id: string) => `/reviews/${id}`,
    REPLY: (id: string) => `/reviews/${id}/reply`,
  },

  // ─── Promotions ───────────────────────────────────────────────────────────
  PROMOTIONS: {
    LIST: '/promotions',
    APPLY_COUPON: '/promotions/apply',
    VALIDATE_COUPON: '/promotions/validate',
    // Admin
    CREATE: '/promotions',
    UPDATE: (id: string) => `/promotions/${id}`,
    DELETE: (id: string) => `/promotions/${id}`,
  },

  // ─── Riders ───────────────────────────────────────────────────────────────
  RIDERS: {
    PROFILE: '/riders/profile',
    UPDATE_PROFILE: '/riders/profile',
    TOGGLE_AVAILABILITY: '/riders/availability',
    EARNINGS: '/riders/earnings',
    DELIVERY_HISTORY: '/riders/deliveries',
    ACTIVE_DELIVERY: '/riders/active-delivery',
    STATS: '/riders/stats',
  },

  // ─── Admin ────────────────────────────────────────────────────────────────
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    USER_DETAIL: (id: string) => `/admin/users/${id}`,
    SUSPEND_USER: (id: string) => `/admin/users/${id}/suspend`,
    ACTIVATE_USER: (id: string) => `/admin/users/${id}/activate`,
    RESTAURANTS: '/admin/restaurants',
    RESTAURANT_DETAIL: (id: string) => `/admin/restaurants/${id}`,
    VERIFY_RESTAURANT: (id: string) => `/admin/restaurants/${id}/verify`,
    REJECT_RESTAURANT: (id: string) => `/admin/restaurants/${id}/reject`,
    ORDERS: '/admin/orders',
    RIDERS: '/admin/riders',
    PAYMENTS: '/admin/payments',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
  },

  // ─── Analytics ────────────────────────────────────────────────────────────
  ANALYTICS: {
    OVERVIEW: '/analytics/overview',
    REVENUE: '/analytics/revenue',
    ORDERS: '/analytics/orders',
    RESTAURANTS: '/analytics/restaurants',
    RIDERS: '/analytics/riders',
    CITIES: '/analytics/cities',
  },
} as const;

export default ENDPOINTS;
