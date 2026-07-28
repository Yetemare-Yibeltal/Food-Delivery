'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Star,
  Clock,
  Bike,
  MapPin,
  Phone,
  Globe,
  Heart,
  Share2,
  ChevronDown,
  Check,
  Store,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/Badge';
import { useUserStore } from '@/stores/user.store';
import { useAuthStore } from '@/stores/auth.store';
import type { IRestaurant } from './restaurant.api';

// ─── Working Hours Display ────────────────────────────────────────────────────
const WorkingHoursDisplay = ({
  workingHours,
}: {
  workingHours: IRestaurant['workingHours'];
}): React.JSX.Element => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  const today = new Date()
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toLowerCase();

  const todayHours = workingHours[today];

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
      >
        <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
        <span>
          Today:{' '}
          {todayHours?.isOpen
            ? `${todayHours.open} - ${todayHours.close}`
            : 'Closed'}
        </span>
        <ChevronDown
          className={cn(
            'w-3 h-3 transition-transform duration-200',
            isExpanded && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass rounded-xl p-4 space-y-2"
        >
          {days.map((day) => {
            const hours = workingHours[day];
            const isToday = day === today;
            return (
              <div
                key={day}
                className={cn(
                  'flex items-center justify-between text-sm',
                  isToday ? 'text-primary font-semibold' : 'text-white/60',
                )}
              >
                <span className="capitalize">{day}</span>
                <span>
                  {hours?.isOpen
                    ? `${hours.open} - ${hours.close}`
                    : 'Closed'}
                </span>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

// ─── Restaurant Detail Props ──────────────────────────────────────────────────
interface RestaurantDetailProps {
  restaurant: IRestaurant;
}

// ─── Restaurant Detail Component ──────────────────────────────────────────────
export const RestaurantDetail = ({
  restaurant,
}: RestaurantDetailProps): React.JSX.Element => {
  const [coverError, setCoverError] = React.useState(false);
  const [logoError, setLogoError] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const { isAuthenticated } = useAuthStore();
  const { isFavourite, toggleFavourite } = useUserStore();
  const isWishlisted = isFavourite(restaurant._id);

  const handleShare = async (): Promise<void> => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleFavourite = (): void => {
    if (!isAuthenticated) return;
    toggleFavourite(restaurant._id);
  };

  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
        {!coverError && restaurant.coverImage ? (
          <Image
            src={restaurant.coverImage}
            alt={`${restaurant.name} cover`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            onError={() => setCoverError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-amber-500/20 flex items-center justify-center">
            <span className="text-8xl" aria-hidden="true">🍽️</span>
          </div>
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          aria-hidden="true"
        />

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            aria-label="Share restaurant"
          >
            {copied ? (
              <Check className="w-4 h-4 text-success" aria-hidden="true" />
            ) : (
              <Share2 className="w-4 h-4" aria-hidden="true" />
            )}
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavourite}
            className={cn(
              'w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors',
              isWishlisted
                ? 'bg-destructive text-white'
                : 'bg-black/40 text-white hover:bg-black/60',
            )}
            aria-label={isWishlisted ? 'Remove from favourites' : 'Add to favourites'}
            aria-pressed={isWishlisted}
          >
            <Heart
              className={cn('w-4 h-4', isWishlisted && 'fill-current')}
              aria-hidden="true"
            />
          </motion.button>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold',
              'backdrop-blur-sm shadow-md',
              restaurant.isOpen
                ? 'bg-success/80 text-white'
                : 'bg-black/60 text-white/70',
            )}
          >
            <div
              className={cn(
                'w-2 h-2 rounded-full',
                restaurant.isOpen ? 'bg-white animate-pulse' : 'bg-white/40',
              )}
              aria-hidden="true"
            />
            {restaurant.isOpen ? 'Open Now' : 'Closed'}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between gap-4">
            {/* Logo */}
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-black/50 shadow-xl shrink-0">
              {!logoError && restaurant.logo ? (
                <Image
                  src={restaurant.logo}
                  alt={`${restaurant.name} logo`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-3xl" aria-hidden="true">🍽️</span>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                <Star className="w-4 h-4 fill-accent text-accent" aria-hidden="true" />
                <span className="font-bold">{restaurant.rating.average.toFixed(1)}</span>
                <span className="text-white/60">({restaurant.rating.count})</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>{restaurant.deliverySettings.estimatedDeliveryTime} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="space-y-6">
        {/* Name & Cuisine */}
        <div className="space-y-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {restaurant.name}
            </h1>
            {restaurant.nameAm && (
              <p className="font-amharic text-white/40 text-lg">
                {restaurant.nameAm}
              </p>
            )}
          </div>

          {/* Cuisine Tags */}
          <div className="flex flex-wrap gap-2">
            {restaurant.cuisineTypes.map((cuisine) => (
              <Badge key={cuisine} variant="glass" size="sm">
                {cuisine}
              </Badge>
            ))}
            {restaurant.tags.map((tag) => (
              <Badge key={tag} variant="muted" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Description */}
          {restaurant.description && (
            <p className="text-white/60 text-sm leading-relaxed">
              {restaurant.description}
            </p>
          )}
          {restaurant.descriptionAm && (
            <p className="font-amharic text-white/40 text-sm leading-relaxed">
              {restaurant.descriptionAm}
            </p>
          )}
        </div>

        {/* Delivery Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              icon: Bike,
              label: 'Delivery Fee',
              value:
                restaurant.deliverySettings.deliveryFee === 0
                  ? 'Free'
                  : `${restaurant.deliverySettings.deliveryFee} ETB`,
              color: 'text-primary',
            },
            {
              icon: Clock,
              label: 'Delivery Time',
              value: `${restaurant.deliverySettings.estimatedDeliveryTime} min`,
              color: 'text-accent',
            },
            {
              icon: Store,
              label: 'Min Order',
              value: `${restaurant.deliverySettings.minimumOrder} ETB`,
              color: 'text-secondary',
            },
            {
              icon: Star,
              label: 'Rating',
              value: `${restaurant.rating.average.toFixed(1)} (${restaurant.rating.count})`,
              color: 'text-accent',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="glass rounded-xl p-4 text-center space-y-2"
              >
                <Icon className={cn('w-5 h-5 mx-auto', item.color)} aria-hidden="true" />
                <p className="text-white font-bold text-sm">{item.value}</p>
                <p className="text-white/40 text-xs">{item.label}</p>
              </div>
            );
          })}
        </div>

        {/* Free Delivery Notice */}
        {restaurant.deliverySettings.freeDeliveryAbove && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-success/10 border border-success/20">
            <span className="text-lg" aria-hidden="true">🎉</span>
            <p className="text-sm text-success font-medium">
              Free delivery on orders above{' '}
              {restaurant.deliverySettings.freeDeliveryAbove} ETB
            </p>
          </div>
        )}

        {/* Working Hours */}
        <div className="glass rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-white/70">Working Hours</h3>
          <WorkingHoursDisplay workingHours={restaurant.workingHours} />
        </div>

        {/* Location & Contact */}
        <div className="glass rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white/70">Location & Contact</h3>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-white text-sm">{restaurant.location.address}</p>
                <p className="text-white/40 text-xs">
                  {restaurant.location.subCity && `${restaurant.location.subCity}, `}
                  {restaurant.location.city}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
              
                href={`tel:${restaurant.phone}`}
                className="text-white text-sm hover:text-primary transition-colors"
              >
                {restaurant.phone}
              </a>
            </div>

            {restaurant.email && (
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 text-primary text-sm shrink-0" aria-hidden="true">@</span>
                
                  href={`mailto:${restaurant.email}`}
                  className="text-white text-sm hover:text-primary transition-colors"
                >
                  {restaurant.email}
                </a>
              </div>
            )}

            {restaurant.website && (
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                
                  href={restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm hover:text-primary transition-colors truncate"
                >
                  {restaurant.website}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;