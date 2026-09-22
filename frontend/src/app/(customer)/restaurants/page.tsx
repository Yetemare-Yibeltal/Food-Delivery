'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { RestaurantGrid } from '@/features/restaurant/RestaurantGrid';
import { RestaurantFilters } from '@/features/restaurant/RestaurantFilters';
import { useRestaurants } from '@/features/restaurant/restaurant.hooks';
import { useDebounce } from '@/hooks/useDebounce';
import type { IRestaurantFilters } from '@/features/restaurant/restaurant.api';

// ─── Restaurants Page Content ─────────────────────────────────────────────────
function RestaurantsPageContent(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = React.useState<IRestaurantFilters>({
    city: searchParams.get('city') ?? undefined,
    cuisineType: searchParams.get('cuisineType') ?? undefined,
    sortBy: (searchParams.get('sortBy') as IRestaurantFilters['sortBy']) ?? 'rating',
    page: 1,
    limit: 12,
  });

  const debouncedFilters = useDebounce(filters, 400);
  const { data, isLoading, isError, error, refetch } = useRestaurants(debouncedFilters);

  const restaurants = data?.data.items ?? [];
  const total = data?.data.pagination.total ?? 0;
  const totalPages = data?.data.pagination.totalPages ?? 1;
  const currentPage = filters.page ?? 1;

  const handleFilterChange = (newFilters: IRestaurantFilters): void => {
    setFilters(newFilters);
  };

  const handleClearFilters = (): void => {
    setFilters({ page: 1, limit: 12, sortBy: 'rating' });
  };

  const handlePageChange = (page: number): void => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="heading-xl text-white">
          Restaurants
        </h1>
        <p className="text-white/50 text-sm">
          Order from hundreds of restaurants across Ethiopia
        </p>
        <p className="font-amharic text-white/30 text-xs">
          በኢትዮጵያ ከሚገኙ በሺዎች የሚቆጠሩ ምግብ ቤቶች ያዝዙ
        </p>
      </div>

      {/* Filters */}
      <RestaurantFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClearFilters}
        totalResults={total}
      />

      {/* Restaurant Grid */}
      <RestaurantGrid
        restaurants={restaurants}
        isLoading={isLoading}
        isError={isError}
        error={
          error instanceof Error ? error.message : 'Failed to load restaurants'
        }
        onRetry={() => refetch()}
        columns={3}
        skeletonCount={12}
      />

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/60 text-sm font-medium hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const page =
                totalPages <= 5
                  ? i + 1
                  : currentPage <= 3
                    ? i + 1
                    : currentPage >= totalPages - 2
                      ? totalPages - 4 + i
                      : currentPage - 2 + i;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                    page === currentPage
                      ? 'bg-primary text-white glow-primary'
                      : 'border border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/60 text-sm font-medium hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Restaurants Page ─────────────────────────────────────────────────────────
export default function RestaurantsPage(): React.JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="h-10 w-48 bg-white/5 rounded-xl animate-pulse" />
              <div className="h-4 w-72 bg-white/5 rounded-lg animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <RestaurantsPageContent />
    </Suspense>
  );
}