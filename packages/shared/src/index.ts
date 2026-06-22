// ─── Enums ────────────────────────────────────────────────────────────────────
export {
  UserRole,
  UserStatus,
  Gender,
  AuthProvider,
  OtpPurpose,
  AddressLabel,
  NotificationChannel,
} from './enums/user.enum';

export {
  OrderStatus,
  OrderType,
  OrderCancelReason,
  OrderRejectReason,
  OrderSortBy,
  OrderTimeFilter,
  RiderAssignmentStatus,
  DeliveryStatus,
} from './enums/order.enum';

export {
  PaymentMethod,
  PaymentStatus,
  TransactionType,
  RefundReason,
  RefundStatus,
  PayoutStatus,
  PayoutRecipient,
  Currency,
  PaymentGateway,
  DiscountType,
  CouponStatus,
  WalletTransactionType,
  PaymentSortBy,
} from './enums/payment.enum';

// ─── Types — User ─────────────────────────────────────────────────────────────
export type {
  IAddress,
  INotificationPreferences,
  IUserPreferences,
  IDeviceToken,
  IUserStats,
  IUser,
  IAuthTokens,
  IAuthResponse,
  IPublicUser,
  IRegisterDTO,
  ILoginDTO,
  IForgotPasswordDTO,
  IResetPasswordDTO,
  IChangePasswordDTO,
  IVerifyOtpDTO,
  IUpdateProfileDTO,
  IUpdatePreferencesDTO,
  IAddAddressDTO,
  IUpdateAddressDTO,
  IPaginatedUsers,
  IUserFilters,
  ITokenPayload,
  IRefreshTokenDTO,
  IApiResponse,
  IFieldError,
  IResponseMeta,
} from './types/user.types';

// ─── Types — Restaurant ───────────────────────────────────────────────────────
export { RestaurantStatus, CuisineType } from './types/restaurant.types';

export type {
  DayOfWeek,
  IOpeningHours,
  IBreakTime,
  IRestaurantAddress,
  IRestaurantBankAccount,
  IRestaurantStats,
  IRestaurantSettings,
  IRestaurant,
  IFoodAddonOption,
  IFoodAddonGroup,
  IFoodNutrition,
  IFood,
  IFoodCategory,
  ICreateRestaurantDTO,
  IUpdateRestaurantDTO,
  ICreateFoodDTO,
  IUpdateFoodDTO,
  ICreateFoodCategoryDTO,
  IUpdateFoodCategoryDTO,
  IRestaurantFilters,
  IFoodFilters,
  IPaginatedRestaurants,
  IPaginatedFoods,
  IRestaurantReview,
  IReviewReply,
  ICreateReviewDTO,
  IRestaurantDashboardStats,
  ITopSellingItem,
  IRevenueByDay,
  IOrdersByStatus,
  INearbyRestaurant,
  IRestaurantOwnerInfo,
} from './types/restaurant.types';

// ─── Types — Order ────────────────────────────────────────────────────────────
export { NotificationType } from './types/order.types';

export type {
  IOrderItemAddon,
  IOrderItem,
  IOrderAddress,
  IOrderPayment,
  IOrderStatusHistory,
  IOrderRating,
  IOrderPromo,
  IRiderLocation,
  IOrder,
  ICartItemAddon,
  ICartItem,
  ICart,
  IAddToCartDTO,
  IUpdateCartItemDTO,
  IApplyPromoDTO,
  ICreateOrderDTO,
  IUpdateOrderStatusDTO,
  IRateOrderDTO,
  IPaginatedOrders,
  IOrderFilters,
  IInitializePaymentDTO,
  IVerifyPaymentDTO,
  IPaymentResponse,
  IRiderInfo,
  IDeliveryTracking,
  IUpdateRiderLocationDTO,
  IOrderAnalytics,
  IOrdersByCity,
  IOrdersByPaymentMethod,
  ITopRestaurant,
  INotification,
  IPaginatedNotifications,
  ICoupon,
  ICreateCouponDTO,
} from './types/order.types';

// ─── Constants ────────────────────────────────────────────────────────────────
export {
  APP_INFO,
  CURRENCY,
  LANGUAGES,
  PAGINATION,
  FILE_UPLOAD,
  AUTH,
  OTP,
  ORDER,
  DELIVERY,
  RATE_LIMIT,
  ETHIOPIAN_PHONE,
  PLATFORM_FEES,
  NOTIFICATION,
  CACHE_TTL,
  SOCKET_EVENTS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  REGEX,
} from './constants/app.constants';

export {
  ETHIOPIAN_CITIES,
  ACTIVE_CITIES,
  CITY_OPTIONS,
  getCityById,
  getCityName,
  getSubCities,
  calculateDeliveryFee,
} from './constants/cities.constants';

export type { ICity, ISubCity, CityId } from './constants/cities.constants';

// ─── Validators ───────────────────────────────────────────────────────────────
export {
  // Field validators
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  phoneValidator,
  passwordValidator,
  otpValidator,
  coordinatesValidator,
  dateOfBirthValidator,

  // Schemas
  RegisterSchema,
  LoginSchema,
  ForgotPasswordSchema,
  VerifyOtpSchema,
  ResendOtpSchema,
  ResetPasswordSchema,
  ChangePasswordSchema,
  RefreshTokenSchema,
  UpdateProfileSchema,
  AddAddressSchema,
  UpdateAddressSchema,
  UpdatePreferencesSchema,
  DeleteAccountSchema,
  DeviceTokenSchema,
  RemoveDeviceTokenSchema,
} from './validators/auth.validators';

export type {
  // Inferred types
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  VerifyOtpInput,
  ResendOtpInput,
  ResetPasswordInput,
  ChangePasswordInput,
  RefreshTokenInput,
  UpdateProfileInput,
  AddAddressInput,
  UpdateAddressInput,
  UpdatePreferencesInput,
  DeleteAccountInput,
  DeviceTokenInput,
  RemoveDeviceTokenInput,
} from './validators/auth.validators';
