import type { UserRole } from '../enums/user.enum';

// ─── Restaurant Status ────────────────────────────────────────────────────────
export enum RestaurantStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  REJECTED = 'rejected',
}

// ─── Cuisine Types ────────────────────────────────────────────────────────────
export enum CuisineType {
  ETHIOPIAN = 'ethiopian',
  ITALIAN = 'italian',
  CHINESE = 'chinese',
  INDIAN = 'indian',
  AMERICAN = 'american',
  MEXICAN = 'mexican',
  MEDITERRANEAN = 'mediterranean',
  JAPANESE = 'japanese',
  THAI = 'thai',
  FAST_FOOD = 'fast_food',
  PIZZA = 'pizza',
  BURGER = 'burger',
  SANDWICH = 'sandwich',
  SALAD = 'salad',
  DESSERT = 'dessert',
  BAKERY = 'bakery',
  COFFEE = 'coffee',
  JUICE = 'juice',
  SEAFOOD = 'seafood',
  VEGAN = 'vegan',
  OTHER = 'other',
}

// ─── Day of Week ──────────────────────────────────────────────────────────────
export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

// ─── Opening Hours ────────────────────────────────────────────────────────────
export interface IOpeningHours {
  day: DayOfWeek;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  breaks?: IBreakTime[];
}

// ─── Break Time ───────────────────────────────────────────────────────────────
export interface IBreakTime {
  startTime: string;
  endTime: string;
}

// ─── Restaurant Address ───────────────────────────────────────────────────────
export interface IRestaurantAddress {
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

// ─── Restaurant Bank Account ──────────────────────────────────────────────────
export interface IRestaurantBankAccount {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  telebirrNumber?: string;
  cbeNumber?: string;
}

// ─── Restaurant Stats ─────────────────────────────────────────────────────────
export interface IRestaurantStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  totalRatings: number;
  averageRating: number;
  cancelledOrders: number;
  completedOrders: number;
  activeMenuItems: number;
}

// ─── Restaurant Settings ──────────────────────────────────────────────────────
export interface IRestaurantSettings {
  autoAcceptOrders: boolean;
  maxConcurrentOrders: number;
  preparationTimeMinutes: number;
  isTemporarilyClosed: boolean;
  temporaryCloseReason?: string;
  temporaryCloseUntil?: Date;
  allowScheduledOrders: boolean;
  maxScheduledOrderDays: number;
}

// ─── Main Restaurant Interface ────────────────────────────────────────────────
export interface IRestaurant {
  _id: string;
  name: string;
  nameAm?: string;
  slug: string;
  description: string;
  descriptionAm?: string;
  owner: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  logo?: string;
  coverImage?: string;
  images?: string[];
  cuisineTypes: CuisineType[];
  tags?: string[];
  address: IRestaurantAddress;
  openingHours: IOpeningHours[];
  status: RestaurantStatus;
  isOpen: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  rating: number;
  totalRatings: number;
  deliveryFee: number;
  minOrderAmount: number;
  maxDeliveryRadius: number;
  estimatedDeliveryTime: number;
  bankAccount?: IRestaurantBankAccount;
  stats: IRestaurantStats;
  settings: IRestaurantSettings;
  licenseNumber?: string;
  licenseImage?: string;
  rejectionReason?: string;
  suspensionReason?: string;
  verifiedAt?: Date;
  verifiedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Food Addon Option ────────────────────────────────────────────────────────
export interface IFoodAddonOption {
  _id: string;
  name: string;
  nameAm?: string;
  price: number;
  isDefault?: boolean;
}

// ─── Food Addon Group ─────────────────────────────────────────────────────────
export interface IFoodAddonGroup {
  _id: string;
  name: string;
  nameAm?: string;
  isRequired: boolean;
  minSelection: number;
  maxSelection: number;
  options: IFoodAddonOption[];
}

// ─── Food Nutrition ───────────────────────────────────────────────────────────
export interface IFoodNutrition {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
}

// ─── Food Interface ───────────────────────────────────────────────────────────
export interface IFood {
  _id: string;
  name: string;
  nameAm?: string;
  slug: string;
  description: string;
  descriptionAm?: string;
  price: number;
  discountedPrice?: number;
  image?: string;
  images?: string[];
  category: string;
  categoryName: string;
  restaurant: string;
  restaurantName: string;
  addonGroups: IFoodAddonGroup[];
  isAvailable: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  spiceLevel?: 1 | 2 | 3;
  isFeatured: boolean;
  preparationTime: number;
  nutrition?: IFoodNutrition;
  allergens?: string[];
  tags?: string[];
  totalOrders: number;
  rating: number;
  totalRatings: number;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Food Category ────────────────────────────────────────────────────────────
export interface IFoodCategory {
  _id: string;
  name: string;
  nameAm?: string;
  description?: string;
  image?: string;
  restaurant: string;
  isActive: boolean;
  sortOrder: number;
  foodCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Create Restaurant DTO ────────────────────────────────────────────────────
export interface ICreateRestaurantDTO {
  name: string;
  nameAm?: string;
  description: string;
  descriptionAm?: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  cuisineTypes: CuisineType[];
  tags?: string[];
  address: IRestaurantAddress;
  openingHours: IOpeningHours[];
  deliveryFee: number;
  minOrderAmount: number;
  maxDeliveryRadius: number;
  estimatedDeliveryTime: number;
  licenseNumber?: string;
}

// ─── Update Restaurant DTO ────────────────────────────────────────────────────
export interface IUpdateRestaurantDTO extends Partial<ICreateRestaurantDTO> {
  logo?: string;
  coverImage?: string;
  images?: string[];
  bankAccount?: IRestaurantBankAccount;
  settings?: Partial<IRestaurantSettings>;
}

// ─── Create Food DTO ──────────────────────────────────────────────────────────
export interface ICreateFoodDTO {
  name: string;
  nameAm?: string;
  description: string;
  descriptionAm?: string;
  price: number;
  discountedPrice?: number;
  category: string;
  addonGroups?: IFoodAddonGroup[];
  isAvailable?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  spiceLevel?: 1 | 2 | 3;
  isFeatured?: boolean;
  preparationTime: number;
  nutrition?: IFoodNutrition;
  allergens?: string[];
  tags?: string[];
  sortOrder?: number;
}

// ─── Update Food DTO ──────────────────────────────────────────────────────────
export interface IUpdateFoodDTO extends Partial<ICreateFoodDTO> {
  image?: string;
  images?: string[];
}

// ─── Create Food Category DTO ─────────────────────────────────────────────────
export interface ICreateFoodCategoryDTO {
  name: string;
  nameAm?: string;
  description?: string;
  image?: string;
  sortOrder?: number;
}

// ─── Update Food Category DTO ─────────────────────────────────────────────────
export interface IUpdateFoodCategoryDTO extends Partial<ICreateFoodCategoryDTO> {}

// ─── Restaurant Filters ───────────────────────────────────────────────────────
export interface IRestaurantFilters {
  city?: string;
  cuisineType?: CuisineType;
  isOpen?: boolean;
  isFeatured?: boolean;
  minRating?: number;
  maxDeliveryFee?: number;
  maxDeliveryTime?: number;
  search?: string;
  tags?: string[];
  lat?: number;
  lng?: number;
  radius?: number;
  page?: number;
  limit?: number;
  sortBy?: 'rating' | 'deliveryFee' | 'deliveryTime' | 'distance' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// ─── Food Filters ─────────────────────────────────────────────────────────────
export interface IFoodFilters {
  restaurant?: string;
  category?: string;
  isAvailable?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'rating' | 'totalOrders' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// ─── Paginated Restaurants ────────────────────────────────────────────────────
export interface IPaginatedRestaurants {
  restaurants: IRestaurant[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ─── Paginated Foods ──────────────────────────────────────────────────────────
export interface IPaginatedFoods {
  foods: IFood[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ─── Restaurant Review ────────────────────────────────────────────────────────
export interface IRestaurantReview {
  _id: string;
  restaurant: string;
  customer: string;
  customerName: string;
  customerAvatar?: string;
  order: string;
  foodRating: number;
  deliveryRating: number;
  overallRating: number;
  comment?: string;
  images?: string[];
  reply?: IReviewReply;
  isVerified: boolean;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Review Reply ─────────────────────────────────────────────────────────────
export interface IReviewReply {
  message: string;
  repliedAt: Date;
  repliedBy: string;
}

// ─── Create Review DTO ────────────────────────────────────────────────────────
export interface ICreateReviewDTO {
  restaurant: string;
  order: string;
  foodRating: number;
  deliveryRating: number;
  comment?: string;
  images?: string[];
}

// ─── Restaurant Dashboard Stats ───────────────────────────────────────────────
export interface IRestaurantDashboardStats {
  todayOrders: number;
  todayRevenue: number;
  pendingOrders: number;
  activeOrders: number;
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  topSellingItems: ITopSellingItem[];
  revenueByDay: IRevenueByDay[];
  ordersByStatus: IOrdersByStatus[];
}

// ─── Top Selling Item ─────────────────────────────────────────────────────────
export interface ITopSellingItem {
  food: string;
  name: string;
  image?: string;
  totalOrders: number;
  totalRevenue: number;
}

// ─── Revenue By Day ───────────────────────────────────────────────────────────
export interface IRevenueByDay {
  date: string;
  revenue: number;
  orders: number;
}

// ─── Orders By Status ─────────────────────────────────────────────────────────
export interface IOrdersByStatus {
  status: string;
  count: number;
}

// ─── Nearby Restaurant ────────────────────────────────────────────────────────
export interface INearbyRestaurant extends IRestaurant {
  distance: number;
  distanceText: string;
}

// ─── Restaurant Owner Info ────────────────────────────────────────────────────
export interface IRestaurantOwnerInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
}
