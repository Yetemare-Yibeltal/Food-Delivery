import { api } from '@/lib/api/client';
import { ENDPOINTS } from '@/lib/api/endpoints';
import type { IApiResponse } from '@/features/auth/auth.api';

// ─── Restaurant Types ─────────────────────────────────────────────────────────
export interface IRestaurantLocation {
  address: string;
  city: string;
  subCity?: string;
  woreda?: string;
  coordinates: {
    type: string;
    coordinates: [number, number];
  };
}

export interface IDeliverySettings {
  minimumOrder: number;
  deliveryFee: number;
  freeDeliveryAbove?: number;
  estimatedDeliveryTime: number;
  maxDeliveryRadius: number;
  isDeliveryAvailable: boolean;
  isPickupAvailable: boolean;
}

export interface IWorkingHours {
  open: string;
  close: string;
  isOpen: boolean;
}

export interface IRestaurantRating {
  average: number;
  count: number;
  distribution?: Record<string, number>;
}

export interface IRestaurant {
  _id: string;
  name: string;
  nameAm?: string;
  slug: string;
  description?: string;
  descriptionAm?: string;
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  cuisineTypes: string[];
  logo?: string;
  coverImage?: string;
  images: string[];
  phone: string;
  email?: string;
  website?: string;
  location: IRestaurantLocation;
  workingHours: Record<string, IWorkingHours>;
  deliverySettings: IDeliverySettings;
  rating: IRestaurantRating;
  status: string;
  isOpen: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
  priceRange: 1 | 2 | 3 | 4;
  totalOrders: number;
  totalRevenue?: number;
  distance?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRestaurantFilters {
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

export interface IPaginatedRestaurants {
  items: IRestaurant[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ICreateRestaurantData {
  name: string;
  nameAm?: string;
  description?: string;
  descriptionAm?: string;
  cuisineTypes: string[];
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

export interface IUpdateRestaurantData {
  name?: string;
  nameAm?: string;
  description?: string;
  descriptionAm?: string;
  cuisineTypes?: string[];
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

export interface IRestaurantDashboardStats {
  totalOrders: number;
  totalRevenue: number;
  rating: { average: number; count: number };
  isOpen: boolean;
  status: string;
}

// ─── Get All Restaurants ──────────────────────────────────────────────────────
export const getRestaurantsApi = async (
  filters: IRestaurantFilters = {},
): Promise<IApiResponse<IPaginatedRestaurants>> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const response = await api.get<IApiResponse<IPaginatedRestaurants>>(
    `${ENDPOINTS.RESTAURANTS.LIST}?${params.toString()}`,
  );
  return response.data;
};

// ─── Get Restaurant by ID ─────────────────────────────────────────────────────
export const getRestaurantByIdApi = async (
  id: string,
): Promise<IApiResponse<IRestaurant>> => {
  const response = await api.get<IApiResponse<IRestaurant>>(
    ENDPOINTS.RESTAURANTS.DETAIL(id),
  );
  return response.data;
};

// ─── Get Restaurant by Slug ───────────────────────────────────────────────────
export const getRestaurantBySlugApi = async (
  slug: string,
): Promise<IApiResponse<IRestaurant>> => {
  const response = await api.get<IApiResponse<IRestaurant>>(
    `/restaurants/slug/${slug}`,
  );
  return response.data;
};

// ─── Get Featured Restaurants ─────────────────────────────────────────────────
export const getFeaturedRestaurantsApi = async (
  city?: string,
  limit = 6,
): Promise<IApiResponse<IRestaurant[]>> => {
  const params = new URLSearchParams();
  if (city) params.append('city', city);
  params.append('limit', String(limit));

  const response = await api.get<IApiResponse<IRestaurant[]>>(
    `${ENDPOINTS.RESTAURANTS.FEATURED}?${params.toString()}`,
  );
  return response.data;
};

// ─── Get Nearby Restaurants ───────────────────────────────────────────────────
export const getNearbyRestaurantsApi = async (
  lat: number,
  lng: number,
  radius = 5,
  limit = 10,
): Promise<IApiResponse<IRestaurant[]>> => {
  const response = await api.get<IApiResponse<IRestaurant[]>>(
    `${ENDPOINTS.RESTAURANTS.NEARBY}?lat=${lat}&lng=${lng}&radius=${radius}&limit=${limit}`,
  );
  return response.data;
};

// ─── Get My Restaurant ────────────────────────────────────────────────────────
export const getMyRestaurantApi = async (): Promise
  IApiResponse<IRestaurant>
> => {
  const response = await api.get<IApiResponse<IRestaurant>>(
    ENDPOINTS.RESTAURANTS.MY_RESTAURANT,
  );
  return response.data;
};

// ─── Create Restaurant ────────────────────────────────────────────────────────
export const createRestaurantApi = async (
  data: ICreateRestaurantData,
): Promise<IApiResponse<IRestaurant>> => {
  const response = await api.post<IApiResponse<IRestaurant>>(
    ENDPOINTS.RESTAURANTS.CREATE,
    data,
  );
  return response.data;
};

// ─── Update Restaurant ────────────────────────────────────────────────────────
export const updateRestaurantApi = async (
  id: string,
  data: IUpdateRestaurantData,
): Promise<IApiResponse<IRestaurant>> => {
  const response = await api.put<IApiResponse<IRestaurant>>(
    ENDPOINTS.RESTAURANTS.UPDATE(id),
    data,
  );
  return response.data;
};

// ─── Toggle Open Status ───────────────────────────────────────────────────────
export const toggleRestaurantStatusApi = async (
  id: string,
  isOpen: boolean,
): Promise<IApiResponse<IRestaurant>> => {
  const response = await api.patch<IApiResponse<IRestaurant>>(
    ENDPOINTS.RESTAURANTS.TOGGLE_STATUS(id),
    { isOpen },
  );
  return response.data;
};

// ─── Upload Logo ──────────────────────────────────────────────────────────────
export const uploadRestaurantLogoApi = async (
  id: string,
  file: File,
): Promise<IApiResponse<IRestaurant>> => {
  const formData = new FormData();
  formData.append('logo', file);

  const response = await api.upload<IApiResponse<IRestaurant>>(
    ENDPOINTS.RESTAURANTS.UPDATE_LOGO(id),
    formData,
  );
  return response.data;
};

// ─── Upload Cover ─────────────────────────────────────────────────────────────
export const uploadRestaurantCoverApi = async (
  id: string,
  file: File,
): Promise<IApiResponse<IRestaurant>> => {
  const formData = new FormData();
  formData.append('cover', file);

  const response = await api.upload<IApiResponse<IRestaurant>>(
    ENDPOINTS.RESTAURANTS.UPDATE_COVER(id),
    formData,
  );
  return response.data;
};

// ─── Update Working Hours ─────────────────────────────────────────────────────
export const updateWorkingHoursApi = async (
  id: string,
  data: Record<string, { open: string; close: string; isOpen: boolean }>,
): Promise<IApiResponse<IRestaurant>> => {
  const response = await api.patch<IApiResponse<IRestaurant>>(
    ENDPOINTS.RESTAURANTS.UPDATE_HOURS(id),
    data,
  );
  return response.data;
};

// ─── Update Delivery Settings ─────────────────────────────────────────────────
export const updateDeliverySettingsApi = async (
  id: string,
  data: Partial<IDeliverySettings>,
): Promise<IApiResponse<IRestaurant>> => {
  const response = await api.patch<IApiResponse<IRestaurant>>(
    ENDPOINTS.RESTAURANTS.UPDATE_SETTINGS(id),
    data,
  );
  return response.data;
};

// ─── Get Dashboard Stats ──────────────────────────────────────────────────────
export const getRestaurantDashboardStatsApi = async (
  id: string,
): Promise<IApiResponse<IRestaurantDashboardStats>> => {
  const response = await api.get<IApiResponse<IRestaurantDashboardStats>>(
    ENDPOINTS.RESTAURANTS.DASHBOARD(id),
  );
  return response.data;
};

// ─── Delete Restaurant ────────────────────────────────────────────────────────
export const deleteRestaurantApi = async (
  id: string,
): Promise<IApiResponse<null>> => {
  const response = await api.delete<IApiResponse<null>>(
    ENDPOINTS.RESTAURANTS.UPDATE(id),
  );
  return response.data;
};