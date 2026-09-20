// ─── Add Item DTO ─────────────────────────────────────────────────────────────
export interface AddItemDTO {
  foodId: string;
  restaurantId: string;
  quantity: number;
  addons?: Array<{
    groupName: string;
    optionName: string;
    price: number;
  }>;
  specialInstructions?: string;
}

// ─── Update Item DTO ──────────────────────────────────────────────────────────
export interface UpdateItemDTO {
  quantity: number;
}

// ─── Apply Coupon DTO ─────────────────────────────────────────────────────────
export interface ApplyCouponDTO {
  code: string;
}

// ─── Cart Response DTO ────────────────────────────────────────────────────────
export interface CartResponseDTO {
  _id: string;
  user: string;
  restaurant: {
    _id: string;
    name: string;
    nameAm?: string;
    logo?: string;
    deliverySettings: {
      minimumOrder: number;
      deliveryFee: number;
      freeDeliveryAbove?: number;
      estimatedDeliveryTime: number;
    };
  } | null;
  items: Array<{
    _id: string;
    food: string;
    name: string;
    nameAm?: string;
    price: number;
    quantity: number;
    image?: string;
    addons: Array<{
      groupName: string;
      optionName: string;
      price: number;
    }>;
    specialInstructions?: string;
    totalPrice: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  appliedCoupon?: string;
  couponDiscount?: number;
  notes?: string;
}
