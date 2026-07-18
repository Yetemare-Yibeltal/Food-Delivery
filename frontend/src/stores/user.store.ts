import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { IPublicUser } from '@yene/shared';

// ─── Address Interface ────────────────────────────────────────────────────────
export interface IAddress {
  _id: string;
  label: string;
  customLabel?: string;
  recipientName?: string;
  recipientPhone?: string;
  street: string;
  specificLocation?: string;
  city: string;
  subCity?: string;
  woreda?: string;
  coordinates: { lat: number; lng: number };
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── User Stats Interface ─────────────────────────────────────────────────────
export interface IUserStats {
  totalOrders: number;
  totalSpent: number;
  cancelledOrders: number;
  averageOrderValue: number;
  lastOrderAt?: Date;
}

// ─── User Store State ─────────────────────────────────────────────────────────
interface IUserState {
  profile: IPublicUser | null;
  addresses: IAddress[];
  defaultAddress: IAddress | null;
  favouriteRestaurantIds: string[];
  stats: IUserStats | null;
  selectedCity: string;
  isLoadingProfile: boolean;
  isLoadingAddresses: boolean;

  // Actions
  setProfile: (profile: IPublicUser | null) => void;
  updateProfile: (data: Partial<IPublicUser>) => void;
  setAddresses: (addresses: IAddress[]) => void;
  addAddress: (address: IAddress) => void;
  updateAddress: (id: string, data: Partial<IAddress>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addFavourite: (restaurantId: string) => void;
  removeFavourite: (restaurantId: string) => void;
  toggleFavourite: (restaurantId: string) => void;
  isFavourite: (restaurantId: string) => boolean;
  setStats: (stats: IUserStats) => void;
  setSelectedCity: (city: string) => void;
  setLoadingProfile: (loading: boolean) => void;
  setLoadingAddresses: (loading: boolean) => void;
  clearUser: () => void;
}

// ─── User Store ───────────────────────────────────────────────────────────────
export const useUserStore = create<IUserState>()(
  persist(
    (set, get) => ({
      profile: null,
      addresses: [],
      defaultAddress: null,
      favouriteRestaurantIds: [],
      stats: null,
      selectedCity: 'addis_ababa',
      isLoadingProfile: false,
      isLoadingAddresses: false,

      setProfile: (profile) => {
        set({ profile });
      },

      updateProfile: (data) => {
        const current = get().profile;
        if (!current) return;
        set({ profile: { ...current, ...data } });
      },

      setAddresses: (addresses) => {
        const defaultAddress =
          addresses.find((a) => a.isDefault) ?? addresses[0] ?? null;
        set({ addresses, defaultAddress });
      },

      addAddress: (address) => {
        const state = get();
        const newAddresses = [...state.addresses, address];
        const defaultAddress = address.isDefault
          ? address
          : state.defaultAddress;
        set({ addresses: newAddresses, defaultAddress });
      },

      updateAddress: (id, data) => {
        const state = get();
        const newAddresses = state.addresses.map((a) =>
          a._id === id ? { ...a, ...data } : a,
        );

        // If setting as default update others
        if (data.isDefault) {
          newAddresses.forEach((a) => {
            if (a._id !== id) a.isDefault = false;
          });
        }

        const defaultAddress =
          newAddresses.find((a) => a.isDefault) ??
          newAddresses[0] ??
          null;

        set({ addresses: newAddresses, defaultAddress });
      },

      removeAddress: (id) => {
        const state = get();
        const newAddresses = state.addresses.filter((a) => a._id !== id);
        const defaultAddress =
          newAddresses.find((a) => a.isDefault) ??
          newAddresses[0] ??
          null;
        set({ addresses: newAddresses, defaultAddress });
      },

      setDefaultAddress: (id) => {
        const state = get();
        const newAddresses = state.addresses.map((a) => ({
          ...a,
          isDefault: a._id === id,
        }));
        const defaultAddress = newAddresses.find((a) => a._id === id) ?? null;
        set({ addresses: newAddresses, defaultAddress });
      },

      addFavourite: (restaurantId) => {
        const state = get();
        if (!state.favouriteRestaurantIds.includes(restaurantId)) {
          set({
            favouriteRestaurantIds: [
              ...state.favouriteRestaurantIds,
              restaurantId,
            ],
          });
        }
      },

      removeFavourite: (restaurantId) => {
        set({
          favouriteRestaurantIds: get().favouriteRestaurantIds.filter(
            (id) => id !== restaurantId,
          ),
        });
      },

      toggleFavourite: (restaurantId) => {
        const state = get();
        if (state.favouriteRestaurantIds.includes(restaurantId)) {
          state.removeFavourite(restaurantId);
        } else {
          state.addFavourite(restaurantId);
        }
      },

      isFavourite: (restaurantId) => {
        return get().favouriteRestaurantIds.includes(restaurantId);
      },

      setStats: (stats) => {
        set({ stats });
      },

      setSelectedCity: (city) => {
        set({ selectedCity: city });
      },

      setLoadingProfile: (isLoadingProfile) => {
        set({ isLoadingProfile });
      },

      setLoadingAddresses: (isLoadingAddresses) => {
        set({ isLoadingAddresses });
      },

      clearUser: () => {
        set({
          profile: null,
          addresses: [],
          defaultAddress: null,
          favouriteRestaurantIds: [],
          stats: null,
          isLoadingProfile: false,
          isLoadingAddresses: false,
        });
      },
    }),
    {
      name: 'yene-user',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        profile: state.profile,
        addresses: state.addresses,
        defaultAddress: state.defaultAddress,
        favouriteRestaurantIds: state.favouriteRestaurantIds,
        selectedCity: state.selectedCity,
      }),
    },
  ),
);

// ─── Selectors ────────────────────────────────────────────────────────────────
export const useUserProfile = () => useUserStore((state) => state.profile);
export const useUserAddresses = () => useUserStore((state) => state.addresses);
export const useDefaultAddress = () => useUserStore((state) => state.defaultAddress);
export const useSelectedCity = () => useUserStore((state) => state.selectedCity);
export const useFavouriteIds = () => useUserStore((state) => state.favouriteRestaurantIds);

export default useUserStore;