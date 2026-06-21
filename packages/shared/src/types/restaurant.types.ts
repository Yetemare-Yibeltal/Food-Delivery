export interface IRestaurant {
  _id: string;
  name: string;
  description: string;
  owner: string;
  email: string;
  phone: string;
  logo?: string;
  coverImage?: string;
  cuisine: string[];
  address: IRestaurantAddress;
  openingHours: IOpeningHours[];
  isOpen: boolean;
  isActive: boolean;
  isVerified: boolean;
  rating: number;
  totalRatings: number;
  deliveryFee: number;
  minOrderAmount: number;
  estimatedDeliveryTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRestaurantAddress {
  street: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface IOpeningHours {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface IFood {
  _id: string;
  name: string;
  nameAm?: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  restaurant: string;
  isAvailable: boolean;
  addons?: IFoodAddon[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IFoodAddon {
  name: string;
  price: number;
  isRequired: boolean;
}
