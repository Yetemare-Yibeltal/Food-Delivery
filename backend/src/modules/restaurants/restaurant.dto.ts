import type { RestaurantStatus, CuisineType } from '@yene/shared';

// ─── Create Restaurant DTO ────────────────────────────────────────────────────
export interface CreateRestaurantDTO {
  name: string;
  nameAm?: string;
  description?: string;
  descriptionAm?: string;
  cuisineTypes: CuisineType[];
  phone: string;
  email?: string;
  website?: string;
  location: {
    address: string;
    city: string;
    subCity?: string;
    woreda?: string;
    coordinates: { lat: number; lng: number };
  };
  priceRange?: 1 | 2 | 3 | 4;
  tags?: string[];
}

// ─── Update Restaurant DTO ────────────────────────────────────────────────────
export interface UpdateRestaurantDTO {
  name?: string;
  nameAm?: string;
  description?: string;
  descriptionAm?: string;
  cuisineTypes?: CuisineType[];
  phone?: string;
  email?: string;
  website?: string;
  location?: {
    address: string;
    city: string;
    subCity?: string;
    woreda?: string;
    coordinates: { lat: number; lng: number };
  };
  priceRange?: 1 | 2 | 3 | 4;
  tags?: string[];
}

// ─── Update Working Hours DTO ─────────────────────────────────────────────────
export interface UpdateWorkingHoursDTO {
  monday?: { open: string; close: string; isOpen: boolean };
  tuesday?: { open: string; close: string; isOpen: boolean };
  wednesday?: { open: string; close: string; isOpen: boolean };
  thursday?: { open: string; close: string; isOpen: boolean };
  friday?: { open: string; close: string; isOpen: boolean };
  saturday?: { open: string; close: string; isOpen: boolean };
  sunday?: { open: string; close: string; isOpen: boolean };
}

// ─── Update Delivery Settings DTO ────────────────────────────────────────────
export interface UpdateDeliverySettingsDTO {
  minimumOrder?: number;
  deliveryFee?: number;
  freeDeliveryAbove?: number;
  estimatedDeliveryTime?: number;
  maxDeliveryRadius?: number;
  isDeliveryAvailable?: boolean;
  isPickupAvailable?: boolean;
}

// ─── Update Bank Account DTO ──────────────────────────────────────────────────
export interface UpdateBankAccountDTO {
  bankName?: string;
  accountNumber?: string;
  accountHolderName?: string;
  telebirrNumber?: string;
  cbeBirrNumber?: string;
}

// ─── Restaurant Filter DTO ────────────────────────────────────────────────────
export interface RestaurantFilterDTO {
  city?: string;
  cuisineType?: string;
  isOpen?: boolean;
  isFeatured?: boolean;
  priceRange?: number;
  minRating?: number;
  search?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  page?: number;
  limit?: number;
  sortBy?: 'rating' | 'deliveryTime' | 'deliveryFee' | 'distance' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

// ─── Verify Restaurant DTO ────────────────────────────────────────────────────
export interface VerifyRestaurantDTO {
  restaurantId: string;
  action: 'approve' | 'reject';
  reason?: string;
}

// ─── Toggle Restaurant Status DTO ────────────────────────────────────────────
export interface ToggleRestaurantStatusDTO {
  isOpen: boolean;
}

// ─── Suspend Restaurant DTO ───────────────────────────────────────────────────
export interface SuspendRestaurantDTO {
  reason: string;
}

// ─── Restaurant Response DTO ──────────────────────────────────────────────────
export interface RestaurantResponseDTO {
  _id: string;
  name: string;
  nameAm?: string;
  slug: string;
  description?: string;
  descriptionAm?: string;
  cuisineTypes: string[];
  logo?: string;
  coverImage?: string;
  images: string[];
  phone: string;
  email?: string;
  website?: string;
  location: {
    address: string;
    city: string;
    subCity?: string;
    woreda?: string;
    coordinates: { type: string; coordinates: number[] };
  };
  workingHours: Record<string, { open: string; close: string; isOpen: boolean }>;
  deliverySettings: {
    minimumOrder: number;
    deliveryFee: number;
    freeDeliveryAbove?: number;
    estimatedDeliveryTime: number;
    maxDeliveryRadius: number;
    isDeliveryAvailable: boolean;
    isPickupAvailable: boolean;
  };
  rating: {
    average: number;
    count: number;
  };
  status: RestaurantStatus;
  isOpen: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  tags: string[];
  priceRange: number;
  totalOrders: number;
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  createdAt: Date;
  updatedAt: Date;
  distance?: number;
}