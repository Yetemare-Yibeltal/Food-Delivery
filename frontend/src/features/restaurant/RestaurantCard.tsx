'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Clock, Bike, Store, Heart, Tag } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/Badge';
import { useUserStore } from '@/stores/user.store';
import { useAuthStore } from '@/stores/auth.store';
import type { IRestaurant } from './restaurant.api';

// ─── Restaurant Card Props ────────────────────────────────────────────────────
interface RestaurantCardProps {
  restaurant: IRestaurant;
  index?: number;
  compact?: boolean;
}

// ─── Price Range Display ──────────────────────────────────────────────────────
const PriceRange = ({ range }: { range: number }): React.JSX.Element => (
  <span className="text-xs text-white/50">
    {'ETB '.repeat(range).trim()}
    <span className="text-white/20">{'ETB '.repeat(4 - range).trim()}</span>
  </span>
);

// ─── Restaurant Card ──────────────────────────────────────────────────────────
export const RestaurantCard = ({
  restaurant,
  index = 0,
  compact = false,
}: RestaurantCardProps): React.JSX.Element => {
  const [imageError, setImageError] = React.useState(false);
  const { isAuthenticated } = useAuthStore();
  const { isFavourite, toggleFavourite } = useUserStore();
  const [isHovered, setIsHovered] = React.useState(false);

  const isWishlisted = isFavourite(restaurant._id);

  const handleFavouriteClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    toggleFavourite(restaurant._id);
  };

  const hasDiscount =
    restaurant.deliverySettings.freeDeliveryAbove !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/restaurants/${restaurant.slug}`} className="block">
        <div
          className={cn(
            'relative rounded-2xl overflow-hidden',
            'card-premium',
            'transition-all duration-300',
            isHovered && 'border-primary/30',
          )}
        >
          {/* Restaurant Image */}
          <div
            className={cn(
              'relative overflow-hidden',
              compact ? 'h-36' : 'h-48',
            )}
          >
            {!imageError && (restaurant.coverImage ?? restaurant.logo) ? (
              <Image
                src={restaurant.coverImage ?? restaurant.logo ?? ''}
                alt={restaurant.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className={cn(
                  'w-full h-full flex items-center justify-center',
                  'bg-gradient-to-br from-primary/20 to-amber-500/20',
                )}
              >
                <span className="text-6xl" aria-hidden="true">🍽️</span>
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {restaurant.isFeatured && (
                <Badge variant="primary" size="xs" className="shadow-md">
                  ⭐ Featured
                </Badge>
              )}
              {hasDiscount && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-destructive text-white text-[10px] font-bold shadow-md">
                  <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                  Free delivery
                </div>
              )}
            </div>

            {/* Favourite Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavouriteClick}
              className={cn(
                'absolute top-3 right-3',
                'w-8 h-8 rounded-full',
                'flex items-center justify-center',
                'shadow-md transition-all duration-200',
                isWishlisted
                  ? 'bg-destructive text-white'
                  : 'bg-black/40 backdrop-blur-sm text-white hover:bg-black/60',
              )}
              aria-label={
                isWishlisted
                  ? 'Remove from favourites'
                  : 'Add to favourites'
              }
              aria-pressed={isWishlisted}
            >
              <Heart
                className={cn('w-4 h-4', isWishlisted && 'fill-current')}
                aria-hidden="true"
              />
            </motion.button>

            {/* Open/Closed Badge */}
            <div className="absolute bottom-3 left-3">
              <div
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
                  'shadow-md backdrop-blur-sm',
                  restaurant.isOpen
                    ? 'bg-success/80 text-white'
                    : 'bg-black/60 text-white/70',
                )}
              >
                <div
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    restaurant.isOpen
                      ? 'bg-white animate-pulse'
                      : 'bg-white/40',
                  )}
                  aria-hidden="true"
                />
                {restaurant.isOpen ? 'Open Now' : 'Closed'}
              </div>
            </div>

            {/* Delivery Time */}
            <div className="absolute bottom-3 right-3">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-semibold">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {restaurant.deliverySettings.estimatedDeliveryTime} min
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 space-y-3">
            {/* Name & Rating */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3
                  className={cn(
                    'font-bold text-white leading-tight truncate',
                    'group-hover:text-primary transition-colors duration-200',
                    compact ? 'text-sm' : 'text-base',
                  )}
                >
                  {restaurant.name}
                </h3>
                {restaurant.nameAm && (
                  <p className="text-xs font-amharic text-white/40 truncate">
                    {restaurant.nameAm}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Star
                  className="w-3.5 h-3.5 fill-accent text-accent"
                  aria-hidden="true"
                />
                <span className="text-sm font-bold text-white">
                  {restaurant.rating.average.toFixed(1)}
                </span>
                <span className="text-xs text-white/40">
                  ({restaurant.rating.count.toLocaleString()})
                </span>
              </div>
            </div>

            {/* Cuisine Tags */}
            {!compact && (
              <div className="flex flex-wrap gap-1.5">
                {restaurant.cuisineTypes.slice(0, 3).map((cuisine) => (
                  <span
                    key={cuisine}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/10"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
            )}

            {/* Delivery Info */}
            <div className="flex items-center gap-3 text-xs text-white/50">
              <div className="flex items-center gap-1">
                <Bike className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {restaurant.deliverySettings.deliveryFee === 0
                    ? 'Free delivery'
                    : `${restaurant.deliverySettings.deliveryFee} ETB`}
                </span>
              </div>
              <div
                className="w-1 h-1 rounded-full bg-white/20"
                aria-hidden="true"
              />
              <div className="flex items-center gap-1">
                <Store className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Min {restaurant.deliverySettings.minimumOrder} ETB</span>
              </div>
              <div
                className="w-1 h-1 rounded-full bg-white/20 ml-auto"
                aria-hidden="true"
              />
              <PriceRange range={restaurant.priceRange} />
            </div>

            {/* Distance if available */}
            {restaurant.distance !== undefined && (
              <p className="text-xs text-white/30">
                📍 {restaurant.distance.toFixed(1)} km away
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;