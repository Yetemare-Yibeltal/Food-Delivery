import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { IPublicUser, IAuthTokens } from '@yene/shared';

// ─── Auth State Interface ─────────────────────────────────────────────────────
interface IAuthState {
  user: IPublicUser | null;
  tokens: IAuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  setUser: (user: IPublicUser | null) => void;
  setTokens: (tokens: IAuthTokens | null) => void;
  setAuth: (user: IPublicUser, tokens: IAuthTokens) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  updateUser: (data: Partial<IPublicUser>) => void;
}

// ─── Auth Store ───────────────────────────────────────────────────────────────
export const useAuthStore = create<IAuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,

      setUser: (user) => {
        set({
          user,
          isAuthenticated: user !== null,
        });
      },

      setTokens: (tokens) => {
        set({ tokens });
      },

      setAuth: (user, tokens) => {
        set({
          user,
          tokens,
          isAuthenticated: true,
        });
      },

      clearAuth: () => {
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      setInitialized: (isInitialized) => {
        set({ isInitialized });
      },

      updateUser: (data) => {
        const currentUser = get().user;
        if (!currentUser) return;
        set({
          user: { ...currentUser, ...data },
        });
      },
    }),
    {
      name: 'yene-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

// ─── Selectors ────────────────────────────────────────────────────────────────
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useUserRole = () => useAuthStore((state) => state.user?.role);

export default useAuthStore;
