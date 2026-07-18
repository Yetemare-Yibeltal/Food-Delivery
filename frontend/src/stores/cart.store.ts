import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ─── Cart Item Interface ──────────────────────────────────────────────────────
export interface ICartItem {
  id: string;
  foodId: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  nameAm?: string;
  price: number;
  quantity: number;
  image?: string;
  addons?: Array<{ name: string; price: number }>;
  specialInstructions?: string;
  totalPrice: number;
}

// ─── Promo Code Interface ─────────────────────────────────────────────────────
export interface IAppliedPromo {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discountAmount: number;
}

// ─── Cart State Interface ─────────────────────────────────────────────────────
interface ICartState {
  items: ICartItem[];
  restaurantId: string | null;
  restaurantName: string | null;
  deliveryFee: number;
  appliedPromo: IAppliedPromo | null;
  isLoading: boolean;

  // Computed
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;

  // Actions
  addItem: (item: Omit<ICartItem, 'totalPrice'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (promo: IAppliedPromo) => void;
  removePromo: () => void;
  setDeliveryFee: (fee: number) => void;
  setLoading: (loading: boolean) => void;
}

// ─── Calculate Total Price ────────────────────────────────────────────────────
const calculateItemTotal = (
  price: number,
  quantity: number,
  addons?: Array<{ name: string; price: number }>,
): number => {
  const addonsTotal = addons?.reduce((sum, addon) => sum + addon.price, 0) ?? 0;
  return (price + addonsTotal) * quantity;
};

// ─── Cart Store ───────────────────────────────────────────────────────────────
export const useCartStore = create<ICartState>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,
      restaurantName: null,
      deliveryFee: 0,
      appliedPromo: null,
      isLoading: false,
      itemCount: 0,
      subtotal: 0,
      discount: 0,
      total: 0,

      addItem: (item) => {
        const state = get();

        // If adding from a different restaurant clear cart first
        if (state.restaurantId && state.restaurantId !== item.restaurantId) {
          set({
            items: [],
            restaurantId: null,
            restaurantName: null,
            appliedPromo: null,
            deliveryFee: 0,
          });
        }

        const existingItem = state.items.find(
          (i) =>
            i.foodId === item.foodId &&
            JSON.stringify(i.addons) === JSON.stringify(item.addons),
        );

        let newItems: ICartItem[];

        if (existingItem) {
          newItems = state.items.map((i) =>
            i.id === existingItem.id
              ? {
                  ...i,
                  quantity: i.quantity + item.quantity,
                  totalPrice: calculateItemTotal(
                    i.price,
                    i.quantity + item.quantity,
                    i.addons,
                  ),
                }
              : i,
          );
        } else {
          const newItem: ICartItem = {
            ...item,
            totalPrice: calculateItemTotal(
              item.price,
              item.quantity,
              item.addons,
            ),
          };
          newItems = [...state.items, newItem];
        }

        const subtotal = newItems.reduce((sum, i) => sum + i.totalPrice, 0);
        const appliedPromo = get().appliedPromo;
        const discount = appliedPromo
          ? appliedPromo.discountType === 'percentage'
            ? (subtotal * appliedPromo.discountValue) / 100
            : appliedPromo.discountValue
          : 0;

        set({
          items: newItems,
          restaurantId: item.restaurantId,
          restaurantName: item.restaurantName,
          itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
          subtotal,
          discount,
          total: subtotal - discount + get().deliveryFee,
        });
      },

      removeItem: (itemId) => {
        const state = get();
        const newItems = state.items.filter((i) => i.id !== itemId);
        const subtotal = newItems.reduce((sum, i) => sum + i.totalPrice, 0);
        const discount = state.appliedPromo
          ? state.appliedPromo.discountType === 'percentage'
            ? (subtotal * state.appliedPromo.discountValue) / 100
            : state.appliedPromo.discountValue
          : 0;

        set({
          items: newItems,
          restaurantId: newItems.length === 0 ? null : state.restaurantId,
          restaurantName: newItems.length === 0 ? null : state.restaurantName,
          itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
          subtotal,
          discount,
          total: subtotal - discount + state.deliveryFee,
          appliedPromo: newItems.length === 0 ? null : state.appliedPromo,
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const state = get();
        const newItems = state.items.map((i) =>
          i.id === itemId
            ? {
                ...i,
                quantity,
                totalPrice: calculateItemTotal(i.price, quantity, i.addons),
              }
            : i,
        );

        const subtotal = newItems.reduce((sum, i) => sum + i.totalPrice, 0);
        const discount = state.appliedPromo
          ? state.appliedPromo.discountType === 'percentage'
            ? (subtotal * state.appliedPromo.discountValue) / 100
            : state.appliedPromo.discountValue
          : 0;

        set({
          items: newItems,
          itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
          subtotal,
          discount,
          total: subtotal - discount + state.deliveryFee,
        });
      },

      clearCart: () => {
        set({
          items: [],
          restaurantId: null,
          restaurantName: null,
          deliveryFee: 0,
          appliedPromo: null,
          itemCount: 0,
          subtotal: 0,
          discount: 0,
          total: 0,
        });
      },

      applyPromo: (promo) => {
        const state = get();
        const discount =
          promo.discountType === 'percentage'
            ? (state.subtotal * promo.discountValue) / 100
            : promo.discountValue;

        const appliedPromoWithAmount: IAppliedPromo = {
          ...promo,
          discountAmount: discount,
        };

        set({
          appliedPromo: appliedPromoWithAmount,
          discount,
          total: state.subtotal - discount + state.deliveryFee,
        });
      },

      removePromo: () => {
        const state = get();
        set({
          appliedPromo: null,
          discount: 0,
          total: state.subtotal + state.deliveryFee,
        });
      },

      setDeliveryFee: (fee) => {
        const state = get();
        set({
          deliveryFee: fee,
          total: state.subtotal - state.discount + fee,
        });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },
    }),
    {
      name: 'yene-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        restaurantId: state.restaurantId,
        restaurantName: state.restaurantName,
        deliveryFee: state.deliveryFee,
        appliedPromo: state.appliedPromo,
        itemCount: state.itemCount,
        subtotal: state.subtotal,
        discount: state.discount,
        total: state.total,
      }),
    },
  ),
);

// ─── Cart Selectors ───────────────────────────────────────────────────────────
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartItemCount = () => useCartStore((state) => state.itemCount);
export const useCartTotal = () => useCartStore((state) => state.total);
export const useCartSubtotal = () => useCartStore((state) => state.subtotal);
export const useCartDiscount = () => useCartStore((state) => state.discount);
export const useCartDeliveryFee = () => useCartStore((state) => state.deliveryFee);
export const useCartRestaurant = () => useCartStore((state) => ({
  restaurantId: state.restaurantId,
  restaurantName: state.restaurantName,
}));
export const useAppliedPromo = () => useCartStore((state) => state.appliedPromo);

export default useCartStore;