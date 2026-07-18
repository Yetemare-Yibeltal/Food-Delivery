'use client';

import { useAuthStore } from '@/stores/auth.store';
import { useGetMe } from '@/features/auth/auth.hooks';
import { UserRole } from '@yene/shared';
import type { IPublicUser } from '@yene/shared';

// ─── useAuth Hook ─────────────────────────────────────────────────────────────
export const useAuth = () => {
  const { user, tokens, isAuthenticated, isLoading, clearAuth, setAuth, updateUser } =
    useAuthStore();

  // ─── Role Checks ──────────────────────────────────────────────────────────
  const isCustomer = user?.role === UserRole.CUSTOMER;
  const isRestaurantOwner = user?.role === UserRole.RESTAURANT_OWNER;
  const isRider = user?.role === UserRole.RIDER;
  const isAdmin = user?.role === UserRole.ADMIN;

  // ─── Permission Checks ────────────────────────────────────────────────────
  const canOrder = isAuthenticated && isCustomer;
  const canManageRestaurant = isAuthenticated && (isRestaurantOwner || isAdmin);
  const canDeliverOrders = isAuthenticated && (isRider || isAdmin);
  const canAccessAdmin = isAuthenticated && isAdmin;

  // ─── User Info Helpers ────────────────────────────────────────────────────
  const fullName = user ? `${user.firstName} ${user.lastName}` : '';
  const initials = user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : '';
  const avatarUrl = user?.avatar ?? null;

  // ─── Role Label ───────────────────────────────────────────────────────────
  const roleLabel: Record<UserRole, string> = {
    [UserRole.CUSTOMER]: 'Customer',
    [UserRole.RESTAURANT_OWNER]: 'Restaurant Owner',
    [UserRole.RIDER]: 'Delivery Rider',
    [UserRole.ADMIN]: 'Administrator',
  };

  const currentRoleLabel = user?.role ? roleLabel[user.role] : '';

  // ─── Home Route by Role ───────────────────────────────────────────────────
  const homeRoute = (): string => {
    if (!user) return '/';
    const routes: Record<UserRole, string> = {
      [UserRole.ADMIN]: '/admin/dashboard',
      [UserRole.RESTAURANT_OWNER]: '/restaurant/dashboard',
      [UserRole.RIDER]: '/rider/dashboard',
      [UserRole.CUSTOMER]: '/',
    };
    return routes[user.role] ?? '/';
  };

  return {
    // State
    user,
    tokens,
    isAuthenticated,
    isLoading,

    // Actions
    clearAuth,
    setAuth,
    updateUser,

    // Role checks
    isCustomer,
    isRestaurantOwner,
    isRider,
    isAdmin,

    // Permission checks
    canOrder,
    canManageRestaurant,
    canDeliverOrders,
    canAccessAdmin,

    // Helpers
    fullName,
    initials,
    avatarUrl,
    currentRoleLabel,
    homeRoute,
  };
};

export default useAuth;
