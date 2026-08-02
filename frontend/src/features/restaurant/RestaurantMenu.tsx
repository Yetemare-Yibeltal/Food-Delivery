'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Minus,
  ShoppingCart,
  Flame,
  Leaf,
  Star,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useCartStore } from '@/stores/cart.store';
import { useAuthStore } from '@/stores/auth.store';
import { toast } from '@/components/ui/Toast';

// ─── Food Item Interface ──────────────────────────────────────────────────────
export interface IFoodCategory {
  _id: string;
  name: string;
  nameAm?: string;
  description?: string;
  image?: string;
  isAvailable: boolean;
  sortOrder: number;
}

export interface IFoodAddon {
  name: string;
  nameAm?: string;
  price: number;
  isRequired: boolean;
}

export interface IFoodItem {
  _id: string;
  name: string;
  nameAm?: string;
  description?: string;
  descriptionAm?: string;
  price: number;
  discountedPrice?: number;
  image?: string;
  category: string;
  restaurantId: string;
  restaurantName: string;
  isAvailable: boolean;
  isPopular: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isSpicy: boolean;
  calories?: number;
  addons?: IFoodAddon[];
  preparationTime?: number;
}

// ─── Food Item Card ───────────────────────────────────────────────────────────
const FoodItemCard = ({
  item,
}: {
  item: IFoodItem;
}): React.JSX.Element => {
  const [imageError, setImageError] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0);
  const [isAdding, setIsAdding] = React.useState(false);
  const { isAuthenticated } = useAuthStore();
  const { addItem, items, updateQuantity, removeItem } = useCartStore();

  const cartItem = items.find((i) => i.foodId === item._id);
  const cartQuantity = cartItem?.quantity ?? 0;

  const effectivePrice = item.discountedPrice ?? item.price;
  const hasDiscount = item.discountedPrice !== undefined && item.discountedPrice < item.price;

  const handleAddToCart = (): void => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart');
      return;
    }

    if (!item.isAvailable) {
      toast.error('This item is currently unavailable');
      return;
    }

    setIsAdding(true);

    addItem({
      id: `${item._id}-${Date.now()}`,
      foodId: item._id,
      restaurantId: item.restaurantId,
      restaurantName: item.restaurantName,
      name: item.name,
      nameAm: item.nameAm,
      price: effectivePrice,
      quantity: 1,
      image: item.image,
    });

    toast.success(`${item.name} added to cart!`);
    setQuantity(1);

    setTimeout(() => setIsAdding(false), 500);
  };

  const handleIncrement = (): void => {
    if (cartItem) {
      updateQuantity(cartItem.id, cartQuantity + 1);
    } else {
      handleAddToCart();
    }
  };

  const handleDecrement = (): void => {
    if (!cartItem) return;
    if (cartQuantity <= 1) {
      removeItem(cartItem.id);
      setQuantity(0);
    } else {
      updateQuantity(cartItem.id, cartQuantity - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'group relative flex gap-4 p-4 rounded-2xl',
        'card-premium transition-all duration-300',
        !item.isAvailable && 'opacity-50',
      )}
    >
      {/* Food Image */}
      <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0">
        {!imageError && item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="112px"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-amber-500/20 flex items-center justify-center">
            <span className="text-4xl" aria-hidden="true">🍽️</span>
          </div>
        )}

        {/* Popular Badge */}
        {item.isPopular && (
          <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary text-white text-[9px] font-bold">
            <Star className="w-2 h-2 fill-current" aria-hidden="true" />
            Popular
          </div>
        )}
      </div>

      {/* Food Info */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Name */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-bold text-white text-sm leading-tight">
              {item.name}
            </h4>
            {/* Dietary Badges */}
            <div className="flex gap-1 shrink-0">
              {item.isVegetarian && (
                <div
                  className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center"
                  title="Vegetarian"
                >
                  <Leaf className="w-3 h-3 text-green-500" aria-hidden="true" />
                </div>
              )}
              {item.isSpicy && (
                <div
                  className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center"
                  title="Spicy"
                >
                  <Flame className="w-3 h-3 text-red-500" aria-hidden="true" />
                </div>
              )}
            </div>
          </div>
          {item.nameAm && (
            <p className="font-amharic text-white/30 text-xs">{item.nameAm}</p>
          )}
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Calories */}
        {item.calories && (
          <p className="text-white/30 text-xs">{item.calories} kcal</p>
        )}

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-white">
              {effectivePrice} ETB
            </span>
            {hasDiscount && (
              <span className="text-xs text-white/30 line-through">
                {item.price} ETB
              </span>
            )}
          </div>

          {/* Add/Remove Controls */}
          {!item.isAvailable ? (
            <span className="text-xs text-white/30 font-medium">
              Unavailable
            </span>
          ) : cartQuantity > 0 ? (
            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDecrement}
                className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
              <span className="text-white font-bold text-sm w-6 text-center">
                {cartQuantity}
              </span>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleIncrement}
                className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors glow-primary"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
            </div>
          ) : (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={isAdding}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-xl',
                'bg-primary text-white text-xs font-semibold',
                'hover:bg-primary/80 transition-colors',
                'glow-primary',
                isAdding && 'opacity-70 cursor-not-allowed',
              )}
              aria-label={`Add ${item.name} to cart`}
            >
              <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
              Add
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Restaurant Menu Props ────────────────────────────────────────────────────
interface RestaurantMenuProps {
  restaurantId: string;
  restaurantName: string;
  categories: IFoodCategory[];
  items: IFoodItem[];
  isLoading?: boolean;
}

// ─── Restaurant Menu Component ────────────────────────────────────────────────
export const RestaurantMenu = ({
  restaurantId,
  restaurantName,
  categories,
  items,
  isLoading = false,
}: RestaurantMenuProps): React.JSX.Element => {
  const [activeCategory, setActiveCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const { itemCount } = useCartStore();

  const filteredItems = React.useMemo(() => {
    let filtered = items;

    if (activeCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.nameAm?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [items, activeCategory, searchQuery]);

  const availableItems = filteredItems.filter((item) => item.isAvailable);
  const unavailableItems = filteredItems.filter((item) => !item.isAvailable);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-2xl bg-white/5 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search menu items..."
          className="w-full pl-11 pr-4 py-3 rounded-xl input-premium text-white text-sm"
          aria-label="Search menu items"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap',
            'text-sm font-medium border transition-all duration-200 shrink-0',
            activeCategory === 'all'
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20',
          )}
        >
          🍽️ All Items
          <span className="text-xs opacity-60">({items.length})</span>
        </button>

        {categories.map((category) => {
          const count = items.filter(
            (item) => item.category === category._id,
          ).length;
          return (
            <button
              key={category._id}
              type="button"
              onClick={() => setActiveCategory(category._id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap',
                'text-sm font-medium border transition-all duration-200 shrink-0',
                activeCategory === category._id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20',
              )}
            >
              {category.name}
              <span className="text-xs opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Menu Items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + searchQuery}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <span className="text-5xl" aria-hidden="true">🔍</span>
              <p className="text-white/50 text-sm text-center">
                No items found matching your search.
              </p>
            </div>
          ) : (
            <>
              {/* Available Items */}
              {availableItems.length > 0 && (
                <div className="space-y-3">
                  {availableItems.map((item) => (
                    <FoodItemCard
                      key={item._id}
                      item={{
                        ...item,
                        restaurantId,
                        restaurantName,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Unavailable Items */}
              {unavailableItems.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-white/30 flex items-center gap-2">
                    <span
                      className="flex-1 border-t border-white/10"
                      aria-hidden="true"
                    />
                    Currently Unavailable
                    <span
                      className="flex-1 border-t border-white/10"
                      aria-hidden="true"
                    />
                  </h4>
                  {unavailableItems.map((item) => (
                    <FoodItemCard
                      key={item._id}
                      item={{
                        ...item,
                        restaurantId,
                        restaurantName,
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Floating Cart Button */}
      {itemCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <motion.a
            href="/cart"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'flex items-center gap-3 px-6 py-3.5 rounded-2xl',
              'bg-primary text-white font-semibold shadow-2xl',
              'glow-primary-lg',
            )}
          >
            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
            <span>View Cart</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-black">
              {itemCount}
            </span>
          </motion.a>
        </motion.div>
      )}
    </div>
  );
};

export default RestaurantMenu;