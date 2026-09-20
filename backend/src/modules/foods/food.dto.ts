// ─── Create Food DTO ──────────────────────────────────────────────────────────
export interface CreateFoodDTO {
  name: string;
  nameAm?: string;
  description?: string;
  descriptionAm?: string;
  price: number;
  discountedPrice?: number;
  category: string;
  isAvailable?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
  isGlutenFree?: boolean;
  calories?: number;
  preparationTime?: number;
  tags?: string[];
  sortOrder?: number;
  addonGroups?: Array<{
    name: string;
    nameAm?: string;
    isRequired: boolean;
    minSelect: number;
    maxSelect: number;
    options: Array<{
      name: string;
      nameAm?: string;
      price: number;
      isDefault?: boolean;
    }>;
  }>;
}

// ─── Update Food DTO ──────────────────────────────────────────────────────────
export interface UpdateFoodDTO {
  name?: string;
  nameAm?: string;
  description?: string;
  descriptionAm?: string;
  price?: number;
  discountedPrice?: number;
  category?: string;
  isAvailable?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
  isGlutenFree?: boolean;
  calories?: number;
  preparationTime?: number;
  tags?: string[];
  sortOrder?: number;
  addonGroups?: Array<{
    name: string;
    nameAm?: string;
    isRequired: boolean;
    minSelect: number;
    maxSelect: number;
    options: Array<{
      name: string;
      nameAm?: string;
      price: number;
      isDefault?: boolean;
    }>;
  }>;
}

// ─── Food Filter DTO ──────────────────────────────────────────────────────────
export interface FoodFilterDTO {
  restaurant?: string;
  category?: string;
  isAvailable?: boolean;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'popular' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

// ─── Create Food Category DTO ─────────────────────────────────────────────────
export interface CreateFoodCategoryDTO {
  name: string;
  nameAm?: string;
  description?: string;
  restaurant: string;
  sortOrder?: number;
}

// ─── Update Food Category DTO ─────────────────────────────────────────────────
export interface UpdateFoodCategoryDTO {
  name?: string;
  nameAm?: string;
  description?: string;
  isAvailable?: boolean;
  sortOrder?: number;
}
