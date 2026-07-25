'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, RefreshCw, SearchX } from 'lucide-react';
import { cn } from '@/lib/cn';
import { RestaurantCard } from './RestaurantCard';
import { RestaurantCardSkeleton } from '@/components/ui/Skeleton';
import type { IRestaurant } from './restaurant.api';

// ─── Restaurant Grid Props ────────────────────────────────────────────────────
interface RestaurantGridProps {
  restaurants: IRestaurant[];
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
  onRetry?: () => void;
  emptyMessage?: string;
  emptyDescription?: string;
  columns?: 2 | 3 | 4;
  skeletonCount?: number;
  compact?: boolean;
  className?: string;
}

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({
  message = 'No restaurants found',
  description = 'Try adjusting your filters or search in a different city.',
  onRetry,
}: {
  message?: string;
  description?: string;
  onRetry?: () => void;
}): React.JSX.Element => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-20 gap-6"
  >
    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
      <SearchX className="w-10 h-10 text-white/20" aria-hidden="true" />
    </div>
    <div className="text-center space-y-2">
      <h3 className="text-lg font-bold text-white">{message}</h3>
      <p className="text-white/40 text-sm max-w-sm leading-relaxed">
        {description}
      </p>
    </div>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary border border-primary/20 text-sm font-semibold hover:bg-primary/20 transition-colors"
      >
        <RefreshCw className="w-4 h-4" aria-hidden="true" />
        Try Again
      </button>
    )}
  </motion.div>
);

// ─── Error State ──────────────────────────────────────────────────────────────
const ErrorState = ({
  error,
  onRetry,
}: {
  error?: string;
  onRetry?: () => void;
}): React.JSX.Element => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-20 gap-6"
  >
    <div className="w-20 h-20 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
      <Store className="w-10 h-10 text-destructive/50" aria-hidden="true" />
    </div>
    <div className="text-center space-y-2">
      <h3 className="text-lg font-bold text-white">Failed to load restaurants</h3>
      <p className="text-white/40 text-sm max-w-sm">
        {error ?? 'Something went wrong. Please try again.'}
      </p>
    </div>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary border border-primary/20 text-sm font-semibold hover:bg-primary/20 transition-colors"
      >
        <RefreshCw className="w-4 h-4" aria-hidden="true" />
        Retry
      </button>
    )}
  </motion.div>
);

// ─── Column Classes ───────────────────────────────────────────────────────────
const columnClasses: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

// ─── Restaurant Grid ──────────────────────────────────────────────────────────
export const RestaurantGrid = ({
  restaurants,
  isLoading = false,
  isError = false,
  error,
  onRetry,
  emptyMessage,
  emptyDescription,
  columns = 3,
  skeletonCount = 6,
  compact = false,
  className,
}: RestaurantGridProps): React.JSX.Element => {
  // Loading State
  if (isLoading) {
    return (
      <div
        className={cn(
          'grid gap-6',
          columnClasses[columns],
          className,
        )}
        aria-label="Loading restaurants..."
        aria-busy="true"
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <RestaurantCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error State
  if (isError) {
    return <ErrorState error={error} onRetry={onRetry} />;
  }

  // Empty State
  if (restaurants.length === 0) {
    return (
      <EmptyState
        message={emptyMessage}
        description={emptyDescription}
        onRetry={onRetry}
      />
    );
  }

  // Restaurant Grid
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={restaurants.length}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'grid gap-6',
          columnClasses[columns],
          className,
        )}
        role="list"
        aria-label={`${restaurants.length} restaurants`}
      >
        {restaurants.map((restaurant, index) => (
          <div key={restaurant._id} role="listitem">
            <RestaurantCard
              restaurant={restaurant}
              index={index}
              compact={compact}
            />
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default RestaurantGrid;