'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

// ─── Base Skeleton ────────────────────────────────────────────────────────────
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  animate?: boolean;
}

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export const Skeleton = ({
  className,
  width,
  height,
  rounded = 'md',
  animate = true,
  style,
  ...props
}: SkeletonProps): React.JSX.Element => (
  <div
    className={cn(
      'bg-muted',
      animate && 'animate-pulse',
      roundedClasses[rounded],
      className,
    )}
    style={{
      width: width ?? undefined,
      height: height ?? undefined,
      ...style,
    }}
    aria-hidden="true"
    {...props}
  />
);

// ─── Skeleton Text ────────────────────────────────────────────────────────────
export interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}

export const SkeletonText = ({
  lines = 3,
  className,
  lastLineWidth = '60%',
}: SkeletonTextProps): React.JSX.Element => (
  <div className={cn('space-y-2', className)} aria-hidden="true">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className="h-4"
        style={{
          width: i === lines - 1 ? lastLineWidth : '100%',
        }}
      />
    ))}
  </div>
);

// ─── Restaurant Card Skeleton ─────────────────────────────────────────────────
export const RestaurantCardSkeleton = ({
  className,
}: {
  className?: string;
}): React.JSX.Element => (
  <div
    className={cn(
      'bg-card border border-border rounded-xl overflow-hidden',
      'shadow-card',
      className,
    )}
    aria-hidden="true"
  >
    {/* Image */}
    <Skeleton className="w-full h-48" rounded="none" />

    <div className="p-4 space-y-3">
      {/* Restaurant Name */}
      <Skeleton className="h-5 w-3/4" />

      {/* Cuisine Tags */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16" rounded="full" />
        <Skeleton className="h-5 w-20" rounded="full" />
      </div>

      {/* Rating & Info Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" rounded="full" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Delivery Info */}
      <div className="flex items-center justify-between pt-1 border-t border-border">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  </div>
);

// ─── Food Card Skeleton ───────────────────────────────────────────────────────
export const FoodCardSkeleton = ({
  className,
}: {
  className?: string;
}): React.JSX.Element => (
  <div
    className={cn(
      'bg-card border border-border rounded-xl overflow-hidden',
      'shadow-card flex gap-3 p-3',
      className,
    )}
    aria-hidden="true"
  >
    {/* Image */}
    <Skeleton className="w-24 h-24 shrink-0" rounded="lg" />

    <div className="flex-1 space-y-2 py-1">
      {/* Food Name */}
      <Skeleton className="h-4 w-3/4" />

      {/* Description */}
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />

      {/* Price & Button */}
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-8" rounded="full" />
      </div>
    </div>
  </div>
);

// ─── Order Card Skeleton ──────────────────────────────────────────────────────
export const OrderCardSkeleton = ({
  className,
}: {
  className?: string;
}): React.JSX.Element => (
  <div
    className={cn(
      'bg-card border border-border rounded-xl p-4',
      'shadow-card space-y-4',
      className,
    )}
    aria-hidden="true"
  >
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10" rounded="lg" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-6 w-20" rounded="full" />
    </div>

    {/* Items */}
    <div className="space-y-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between pt-2 border-t border-border">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-9 w-28" rounded="lg" />
    </div>
  </div>
);

// ─── Profile Skeleton ─────────────────────────────────────────────────────────
export const ProfileSkeleton = ({
  className,
}: {
  className?: string;
}): React.JSX.Element => (
  <div className={cn('space-y-6', className)} aria-hidden="true">
    {/* Avatar & Name */}
    <div className="flex items-center gap-4">
      <Skeleton className="w-20 h-20" rounded="full" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>

    {/* Stats Row */}
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-muted rounded-xl p-4 space-y-2">
          <Skeleton className="h-6 w-12 mx-auto" />
          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>

    {/* Info Fields */}
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-1.5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-11 w-full" rounded="lg" />
        </div>
      ))}
    </div>
  </div>
);

// ─── Restaurant Grid Skeleton ─────────────────────────────────────────────────
export const RestaurantGridSkeleton = ({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}): React.JSX.Element => (
  <div
    className={cn(
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
      className,
    )}
    aria-hidden="true"
    aria-label="Loading restaurants..."
  >
    {Array.from({ length: count }).map((_, i) => (
      <RestaurantCardSkeleton key={i} />
    ))}
  </div>
);

// ─── Food List Skeleton ───────────────────────────────────────────────────────
export const FoodListSkeleton = ({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}): React.JSX.Element => (
  <div
    className={cn('space-y-3', className)}
    aria-hidden="true"
    aria-label="Loading menu..."
  >
    {Array.from({ length: count }).map((_, i) => (
      <FoodCardSkeleton key={i} />
    ))}
  </div>
);

// ─── Order List Skeleton ──────────────────────────────────────────────────────
export const OrderListSkeleton = ({
  count = 3,
  className,
}: {
  count?: number;
  className?: string;
}): React.JSX.Element => (
  <div
    className={cn('space-y-4', className)}
    aria-hidden="true"
    aria-label="Loading orders..."
  >
    {Array.from({ length: count }).map((_, i) => (
      <OrderCardSkeleton key={i} />
    ))}
  </div>
);

// ─── Notification Skeleton ────────────────────────────────────────────────────
export const NotificationSkeleton = ({
  className,
}: {
  className?: string;
}): React.JSX.Element => (
  <div
    className={cn('flex items-start gap-3 p-4', className)}
    aria-hidden="true"
  >
    <Skeleton className="w-10 h-10 shrink-0" rounded="full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
);

// ─── Dashboard Stats Skeleton ─────────────────────────────────────────────────
export const DashboardStatsSkeleton = ({
  className,
}: {
  className?: string;
}): React.JSX.Element => (
  <div
    className={cn('grid grid-cols-2 lg:grid-cols-4 gap-4', className)}
    aria-hidden="true"
  >
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="bg-card border border-border rounded-xl p-6 space-y-3"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="w-12 h-12" rounded="xl" />
        </div>
      </div>
    ))}
  </div>
);

// ─── Table Row Skeleton ───────────────────────────────────────────────────────
export const TableRowSkeleton = ({
  cols = 5,
  className,
}: {
  cols?: number;
  className?: string;
}): React.JSX.Element => (
  <tr className={cn('border-b border-border', className)} aria-hidden="true">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <Skeleton className="h-4 w-full" />
      </td>
    ))}
  </tr>
);

// ─── Table Skeleton ───────────────────────────────────────────────────────────
export const TableSkeleton = ({
  rows = 5,
  cols = 5,
  className,
}: {
  rows?: number;
  cols?: number;
  className?: string;
}): React.JSX.Element => (
  <div
    className={cn('w-full overflow-auto', className)}
    aria-hidden="true"
    aria-label="Loading table..."
  >
    <table className="w-full">
      <thead>
        <tr className="border-b border-border">
          {Array.from({ length: cols }).map((_, i) => (
            <th key={i} className="px-4 py-3 text-left">
              <Skeleton className="h-4 w-24" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRowSkeleton key={i} cols={cols} />
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Chat Message Skeleton ────────────────────────────────────────────────────
export const ChatMessageSkeleton = ({
  isOwn = false,
  className,
}: {
  isOwn?: boolean;
  className?: string;
}): React.JSX.Element => (
  <div
    className={cn(
      'flex items-end gap-2',
      isOwn && 'flex-row-reverse',
      className,
    )}
    aria-hidden="true"
  >
    {!isOwn && <Skeleton className="w-8 h-8 shrink-0" rounded="full" />}
    <div
      className={cn(
        'space-y-1 max-w-xs',
        isOwn && 'items-end flex flex-col',
      )}
    >
      <Skeleton className="h-10 w-48" rounded="xl" />
      <Skeleton className="h-3 w-16" />
    </div>
  </div>
);

// ─── Page Header Skeleton ─────────────────────────────────────────────────────
export const PageHeaderSkeleton = ({
  className,
}: {
  className?: string;
}): React.JSX.Element => (
  <div className={cn('space-y-2', className)} aria-hidden="true">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-4 w-96" />
  </div>
);

export default Skeleton;