'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  X,
  ChevronDown,
  Star,
  Clock,
  Bike,
  SlidersHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { ETHIOPIAN_CITIES } from '@yene/shared';
import type { IRestaurantFilters } from './restaurant.api';

// ─── Cuisine Types ────────────────────────────────────────────────────────────
const cuisineTypes = [
  { value: 'ethiopian', label: 'Ethiopian', emoji: '🇪🇹' },
  { value: 'italian', label: 'Italian', emoji: '🍕' },
  { value: 'chinese', label: 'Chinese', emoji: '🥢' },
  { value: 'indian', label: 'Indian', emoji: '🍛' },
  { value: 'american', label: 'American', emoji: '🍔' },
  { value: 'japanese', label: 'Japanese', emoji: '🍱' },
  { value: 'mexican', label: 'Mexican', emoji: '🌮' },
  { value: 'mediterranean', label: 'Mediterranean', emoji: '🥗' },
  { value: 'turkish', label: 'Turkish', emoji: '🥙' },
  { value: 'lebanese', label: 'Lebanese', emoji: '🧆' },
  { value: 'fast_food', label: 'Fast Food', emoji: '🍟' },
  { value: 'coffee', label: 'Coffee', emoji: '☕' },
  { value: 'bakery', label: 'Bakery', emoji: '🥐' },
  { value: 'desserts', label: 'Desserts', emoji: '🍰' },
  { value: 'seafood', label: 'Seafood', emoji: '🦞' },
  { value: 'vegan', label: 'Vegan', emoji: '🥦' },
];

// ─── Sort Options ─────────────────────────────────────────────────────────────
const sortOptions = [
  { value: 'rating', label: 'Top Rated', icon: Star },
  { value: 'deliveryTime', label: 'Fastest', icon: Clock },
  { value: 'deliveryFee', label: 'Lowest Fee', icon: Bike },
  { value: 'newest', label: 'Newest', icon: SlidersHorizontal },
];

// ─── Price Range Options ──────────────────────────────────────────────────────
const priceRanges = [
  { value: 1, label: 'ETB', description: 'Budget' },
  { value: 2, label: 'ETB ETB', description: 'Moderate' },
  { value: 3, label: 'ETB ETB ETB', description: 'Pricey' },
  { value: 4, label: 'ETB ETB ETB ETB', description: 'Fine Dining' },
];

// ─── Rating Options ───────────────────────────────────────────────────────────
const ratingOptions = [
  { value: 4.5, label: '4.5+' },
  { value: 4.0, label: '4.0+' },
  { value: 3.5, label: '3.5+' },
  { value: 3.0, label: '3.0+' },
];

// ─── Restaurant Filters Props ─────────────────────────────────────────────────
interface RestaurantFiltersProps {
  filters: IRestaurantFilters;
  onChange: (filters: IRestaurantFilters) => void;
  onClear: () => void;
  totalResults?: number;
  className?: string;
}

// ─── Restaurant Filters Component ─────────────────────────────────────────────
export const RestaurantFilters = ({
  filters,
  onChange,
  onClear,
  totalResults,
  className,
}: RestaurantFiltersProps): React.JSX.Element => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const activeFilterCount = [
    filters.cuisineType,
    filters.city,
    filters.priceRange,
    filters.minRating,
    filters.isOpen,
    filters.sortBy && filters.sortBy !== 'rating',
  ].filter(Boolean).length;

  const handleFilterChange = (
    key: keyof IRestaurantFilters,
    value: unknown,
  ): void => {
    onChange({
      ...filters,
      [key]: value,
      page: 1,
    });
  };

  const handleCuisineToggle = (cuisine: string): void => {
    handleFilterChange(
      'cuisineType',
      filters.cuisineType === cuisine ? undefined : cuisine,
    );
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl',
              'border transition-all duration-200 text-sm font-medium',
              isExpanded || activeFilterCount > 0
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20',
            )}
          >
            <Filter className="w-4 h-4" aria-hidden="true" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown
              className={cn(
                'w-3 h-3 transition-transform duration-200',
                isExpanded && 'rotate-180',
              )}
              aria-hidden="true"
            />
          </button>

          {/* Sort Options */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {sortOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleFilterChange('sortBy', option.value)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-xl',
                    'border text-xs font-medium whitespace-nowrap',
                    'transition-all duration-200 shrink-0',
                    filters.sortBy === option.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70',
                  )}
                >
                  <Icon className="w-3 h-3" aria-hidden="true" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {totalResults !== undefined && (
            <p className="text-sm text-white/40 hidden sm:block">
              {totalResults} restaurant{totalResults !== 1 ? 's' : ''}
            </p>
          )}
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              <X className="w-3 h-3" aria-hidden="true" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="glass rounded-2xl p-6 space-y-6">
              {/* City Filter */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white/70">City</h4>
                <div className="flex flex-wrap gap-2">
                  {ETHIOPIAN_CITIES.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() =>
                        handleFilterChange(
                          'city',
                          filters.city === city.id ? undefined : city.id,
                        )
                      }
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-full',
                        'text-xs font-medium border transition-all duration-200',
                        filters.city === city.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20',
                      )}
                    >
                      📍 {city.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cuisine Type */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white/70">Cuisine</h4>
                <div className="flex flex-wrap gap-2">
                  {cuisineTypes.map((cuisine) => (
                    <button
                      key={cuisine.value}
                      type="button"
                      onClick={() => handleCuisineToggle(cuisine.value)}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-full',
                        'text-xs font-medium border transition-all duration-200',
                        filters.cuisineType === cuisine.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20',
                      )}
                    >
                      <span aria-hidden="true">{cuisine.emoji}</span>
                      {cuisine.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range & Rating Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Price Range */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white/70">
                    Price Range
                  </h4>
                  <div className="flex gap-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.value}
                        type="button"
                        onClick={() =>
                          handleFilterChange(
                            'priceRange',
                            filters.priceRange === range.value
                              ? undefined
                              : range.value,
                          )
                        }
                        className={cn(
                          'flex-1 py-2 rounded-xl text-xs font-medium',
                          'border transition-all duration-200',
                          filters.priceRange === range.value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-white/10 bg-white/5 text-white/40 hover:border-white/20',
                        )}
                        title={range.description}
                      >
                        {'$'.repeat(range.value)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Minimum Rating */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white/70">
                    Minimum Rating
                  </h4>
                  <div className="flex gap-2">
                    {ratingOptions.map((rating) => (
                      <button
                        key={rating.value}
                        type="button"
                        onClick={() =>
                          handleFilterChange(
                            'minRating',
                            filters.minRating === rating.value
                              ? undefined
                              : rating.value,
                          )
                        }
                        className={cn(
                          'flex-1 flex items-center justify-center gap-1 py-2 rounded-xl',
                          'text-xs font-medium border transition-all duration-200',
                          filters.minRating === rating.value
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-white/10 bg-white/5 text-white/40 hover:border-white/20',
                        )}
                      >
                        <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                        {rating.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Open Now Toggle */}
              <div className="flex items-center justify-between py-3 border-t border-white/5">
                <div>
                  <p className="text-sm font-medium text-white">Open Now</p>
                  <p className="text-xs text-white/40">
                    Show only restaurants that are currently open
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleFilterChange(
                      'isOpen',
                      filters.isOpen ? undefined : true,
                    )
                  }
                  className={cn(
                    'relative w-11 h-6 rounded-full transition-all duration-300',
                    filters.isOpen ? 'bg-primary' : 'bg-white/10',
                  )}
                  role="switch"
                  aria-checked={filters.isOpen ?? false}
                  aria-label="Show only open restaurants"
                >
                  <div
                    className={cn(
                      'absolute top-1 w-4 h-4 rounded-full bg-white shadow-md',
                      'transition-all duration-300',
                      filters.isOpen ? 'left-6' : 'left-1',
                    )}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantFilters;