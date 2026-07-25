'use client';

import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/Toast';
import { useAuthStore } from '@/stores/auth.store';
import {
  getRestaurantsApi,
  getRestaurantByIdApi,
  getRestaurantBySlugApi,
  getFeaturedRestaurantsApi,
  getNearbyRestaurantsApi,
  getMyRestaurantApi,
  createRestaurantApi,
  updateRestaurantApi,
  toggleRestaurantStatusApi,
  uploadRestaurantLogoApi,
  uploadRestaurantCoverApi,
  updateWorkingHoursApi,
  updateDeliverySettingsApi,
  getRestaurantDashboardStatsApi,
  deleteRestaurantApi,
} from './restaurant.api';
import type {
  IRestaurantFilters,
  ICreateRestaurantData,
  IUpdateRestaurantData,
  IDeliverySettings,
} from './restaurant.api';
import axios from 'axios';

// ─── Query Keys ───────────────────────────────────────────────────────────────
export const restaurantKeys = {
  all: ['restaurants'] as const,
  lists: () => [...restaurantKeys.all, 'list'] as const,
  list: (filters: IRestaurantFilters) => [...restaurantKeys.lists(), filters] as const,
  details: () => [...restaurantKeys.all, 'detail'] as const,
  detail: (id: string) => [...restaurantKeys.details(), id] as const,
  slug: (slug: string) => [...restaurantKeys.all, 'slug', slug] as const,
  featured: (city?: string) => [...restaurantKeys.all, 'featured', city] as const,
  nearby: (lat: number, lng: number) => [...restaurantKeys.all, 'nearby', lat, lng] as const,
  my: () => [...restaurantKeys.all, 'my'] as const,
  dashboard: (id: string) => [...restaurantKeys.all, 'dashboard', id] as const,
};

// ─── Get Error Message ────────────────────────────────────────────────────────
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string };
    return data?.message ?? 'Something went wrong. Please try again.';
  }
  if (error instanceof Error) return error.message;
  return 'Something went wrong. Please try again.';
};

// ─── Use Restaurants ──────────────────────────────────────────────────────────
export const useRestaurants = (filters: IRestaurantFilters = {}) => {
  return useQuery({
    queryKey: restaurantKeys.list(filters),
    queryFn: () => getRestaurantsApi(filters),
    staleTime: 2 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
};

// ─── Use Restaurants Infinite ─────────────────────────────────────────────────
export const useRestaurantsInfinite = (filters: Omit<IRestaurantFilters, 'page'> = {}) => {
  return useInfiniteQuery({
    queryKey: [...restaurantKeys.lists(), 'infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      getRestaurantsApi({ ...filters, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.data.pagination;
      return pagination.hasNextPage ? pagination.page + 1 : undefined;
    },
    staleTime: 2 * 60 * 1000,
  });
};

// ─── Use Restaurant by ID ─────────────────────────────────────────────────────
export const useRestaurantById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: restaurantKeys.detail(id),
    queryFn: () => getRestaurantByIdApi(id),
    enabled: enabled && Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
};

// ─── Use Restaurant by Slug ───────────────────────────────────────────────────
export const useRestaurantBySlug = (slug: string, enabled = true) => {
  return useQuery({
    queryKey: restaurantKeys.slug(slug),
    queryFn: () => getRestaurantBySlugApi(slug),
    enabled: enabled && Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
};

// ─── Use Featured Restaurants ─────────────────────────────────────────────────
export const useFeaturedRestaurants = (city?: string, limit = 6) => {
  return useQuery({
    queryKey: restaurantKeys.featured(city),
    queryFn: () => getFeaturedRestaurantsApi(city, limit),
    staleTime: 5 * 60 * 1000,
  });
};

// ─── Use Nearby Restaurants ───────────────────────────────────────────────────
export const useNearbyRestaurants = (
  lat?: number,
  lng?: number,
  radius = 5,
  limit = 10,
) => {
  return useQuery({
    queryKey: restaurantKeys.nearby(lat ?? 0, lng ?? 0),
    queryFn: () => getNearbyRestaurantsApi(lat!, lng!, radius, limit),
    enabled: lat !== undefined && lng !== undefined,
    staleTime: 2 * 60 * 1000,
  });
};

// ─── Use My Restaurant ────────────────────────────────────────────────────────
export const useMyRestaurant = () => {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: restaurantKeys.my(),
    queryFn: () => getMyRestaurantApi(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

// ─── Use Restaurant Dashboard Stats ──────────────────────────────────────────
export const useRestaurantDashboardStats = (id: string, enabled = true) => {
  return useQuery({
    queryKey: restaurantKeys.dashboard(id),
    queryFn: () => getRestaurantDashboardStatsApi(id),
    enabled: enabled && Boolean(id),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
};

// ─── Use Create Restaurant ────────────────────────────────────────────────────
export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateRestaurantData) => createRestaurantApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.all });
      toast.success('Restaurant created!', {
        description: 'Your restaurant is pending verification by our team.',
      });
    },
    onError: (error: unknown) => {
      toast.error('Failed to create restaurant', {
        description: getErrorMessage(error),
      });
    },
  });
};

// ─── Use Update Restaurant ────────────────────────────────────────────────────
export const useUpdateRestaurant = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateRestaurantData) => updateRestaurantApi(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: restaurantKeys.my() });
      queryClient.setQueryData(restaurantKeys.detail(id), response);
      toast.success('Restaurant updated successfully!');
    },
    onError: (error: unknown) => {
      toast.error('Failed to update restaurant', {
        description: getErrorMessage(error),
      });
    },
  });
};

// ─── Use Toggle Restaurant Status ─────────────────────────────────────────────
export const useToggleRestaurantStatus = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isOpen: boolean) => toggleRestaurantStatusApi(id, isOpen),
    onSuccess: (response, isOpen) => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: restaurantKeys.my() });
      toast.success(`Restaurant is now ${isOpen ? 'open' : 'closed'}!`);
    },
    onError: (error: unknown) => {
      toast.error('Failed to update status', {
        description: getErrorMessage(error),
      });
    },
  });
};

// ─── Use Upload Restaurant Logo ───────────────────────────────────────────────
export const useUploadRestaurantLogo = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadRestaurantLogoApi(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: restaurantKeys.my() });
      toast.success('Logo uploaded successfully!');
    },
    onError: (error: unknown) => {
      toast.error('Failed to upload logo', {
        description: getErrorMessage(error),
      });
    },
  });
};

// ─── Use Upload Restaurant Cover ──────────────────────────────────────────────
export const useUploadRestaurantCover = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadRestaurantCoverApi(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: restaurantKeys.my() });
      toast.success('Cover image uploaded successfully!');
    },
    onError: (error: unknown) => {
      toast.error('Failed to upload cover image', {
        description: getErrorMessage(error),
      });
    },
  });
};

// ─── Use Update Working Hours ─────────────────────────────────────────────────
export const useUpdateWorkingHours = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: Record<string, { open: string; close: string; isOpen: boolean }>,
    ) => updateWorkingHoursApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: restaurantKeys.my() });
      toast.success('Working hours updated successfully!');
    },
    onError: (error: unknown) => {
      toast.error('Failed to update working hours', {
        description: getErrorMessage(error),
      });
    },
  });
};

// ─── Use Update Delivery Settings ─────────────────────────────────────────────
export const useUpdateDeliverySettings = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<IDeliverySettings>) =>
      updateDeliverySettingsApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: restaurantKeys.my() });
      toast.success('Delivery settings updated successfully!');
    },
    onError: (error: unknown) => {
      toast.error('Failed to update delivery settings', {
        description: getErrorMessage(error),
      });
    },
  });
};

// ─── Use Delete Restaurant ────────────────────────────────────────────────────
export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRestaurantApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.all });
      toast.success('Restaurant deleted successfully!');
    },
    onError: (error: unknown) => {
      toast.error('Failed to delete restaurant', {
        description: getErrorMessage(error),
      });
    },
  });
};