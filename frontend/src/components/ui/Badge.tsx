'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { scaleVariants } from '@/lib/animations/variants';

// ─── Badge Variants ───────────────────────────────────────────────────────────
const badgeVariants = {
  default: cn(
    'bg-primary/10 text-primary',
    'border border-primary/20',
  ),
  primary: cn(
    'bg-primary text-primary-foreground',
  ),
  secondary: cn(
    'bg-secondary/10 text-secondary',
    'border border-secondary/20',
  ),
  success: cn(
    'bg-success/10 text-success',
    'border border-success/20',
  ),
  successSolid: cn(
    'bg-success text-success-foreground',
  ),
  warning: cn(
    'bg-warning/10 text-warning',
    'border border-warning/20',
  ),
  warningSolid: cn(
    'bg-warning text-warning-foreground',
  ),
  destructive: cn(
    'bg-destructive/10 text-destructive',
    'border border-destructive/20',
  ),
  destructiveSolid: cn(
    'bg-destructive text-destructive-foreground',
  ),
  info: cn(
    'bg-info/10 text-info',
    'border border-info/20',
  ),
  infoSolid: cn(
    'bg-info text-info-foreground',
  ),
  muted: cn(
    'bg-muted text-muted-foreground',
    'border border-border',
  ),
  outline: cn(
    'bg-transparent text-foreground',
    'border border-border',
  ),
  outlinePrimary: cn(
    'bg-transparent text-primary',
    'border border-primary',
  ),
  glass: cn(
    'glass text-foreground',
    'border border-white/20',
  ),
  // Order Status Badges
  pending: cn(
    'bg-warning/10 text-warning',
    'border border-warning/20',
  ),
  confirmed: cn(
    'bg-info/10 text-info',
    'border border-info/20',
  ),
  preparing: cn(
    'bg-primary/10 text-primary',
    'border border-primary/20',
  ),
  onTheWay: cn(
    'bg-secondary/10 text-secondary',
    'border border-secondary/20',
  ),
  delivered: cn(
    'bg-success/10 text-success',
    'border border-success/20',
  ),
  cancelled: cn(
    'bg-destructive/10 text-destructive',
    'border border-destructive/20',
  ),
  rejected: cn(
    'bg-destructive/10 text-destructive',
    'border border-destructive/20',
  ),
};

// ─── Badge Sizes ──────────────────────────────────────────────────────────────
const badgeSizes = {
  xs: 'px-1.5 py-0.5 text-[10px] rounded-md',
  sm: 'px-2 py-0.5 text-xs rounded-md',
  md: 'px-2.5 py-1 text-xs rounded-lg',
  lg: 'px-3 py-1.5 text-sm rounded-lg',
};

// ─── Badge Props ──────────────────────────────────────────────────────────────
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
  size?: keyof typeof badgeSizes;
  dot?: boolean;
  dotColor?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  animate?: boolean;
  icon?: React.ReactNode;
  count?: number;
  maxCount?: number;
}

// ─── Badge Component ──────────────────────────────────────────────────────────
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      dot = false,
      dotColor,
      dismissible = false,
      onDismiss,
      animate = false,
      icon,
      count,
      maxCount = 99,
      children,
      ...props
    },
    ref,
  ) => {
    const displayCount =
      count !== undefined
        ? count > maxCount
          ? `${maxCount}+`
          : count.toString()
        : null;

    const content = (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5',
          'font-medium',
          'transition-colors duration-200',
          badgeVariants[variant],
          badgeSizes[size],
          className,
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full shrink-0',
              dotColor ?? 'bg-current',
            )}
            aria-hidden="true"
          />
        )}
        {icon && (
          <span className="shrink-0 w-3 h-3" aria-hidden="true">
            {icon}
          </span>
        )}
        {displayCount !== null ? displayCount : children}
        {dismissible && onDismiss && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className={cn(
              'ml-0.5 rounded-full p-0.5',
              'hover:bg-black/10 dark:hover:bg-white/10',
              'transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current',
            )}
            aria-label="Remove"
          >
            <X className="w-2.5 h-2.5" aria-hidden="true" />
          </button>
        )}
      </span>
    );

    if (animate) {
      return (
        <motion.span
          variants={scaleVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="inline-flex"
        >
          {content}
        </motion.span>
      );
    }

    return content;
  },
);

Badge.displayName = 'Badge';

// ─── Notification Badge ───────────────────────────────────────────────────────
export interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  className?: string;
  children: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  showZero?: boolean;
}

export const NotificationBadge = ({
  count,
  maxCount = 99,
  className,
  children,
  position = 'top-right',
  showZero = false,
}: NotificationBadgeProps): React.JSX.Element => {
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
  const shouldShow = showZero ? count >= 0 : count > 0;

  const positionClasses = {
    'top-right': '-top-1.5 -right-1.5',
    'top-left': '-top-1.5 -left-1.5',
    'bottom-right': '-bottom-1.5 -right-1.5',
    'bottom-left': '-bottom-1.5 -left-1.5',
  };

  return (
    <div className="relative inline-flex">
      {children}
      <AnimatePresence>
        {shouldShow && (
          <motion.span
            key="badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn(
              'absolute min-w-[18px] h-[18px] px-1',
              'flex items-center justify-center',
              'bg-destructive text-destructive-foreground',
              'text-[10px] font-bold rounded-full',
              'border-2 border-background',
              positionClasses[position],
              className,
            )}
            aria-label={`${count} notifications`}
          >
            {displayCount}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
export interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusMap: Record<string, { variant: keyof typeof badgeVariants; label: string }> = {
  pending: { variant: 'pending', label: 'Pending' },
  confirmed: { variant: 'confirmed', label: 'Confirmed' },
  preparing: { variant: 'preparing', label: 'Preparing' },
  ready_for_pickup: { variant: 'preparing', label: 'Ready for Pickup' },
  picked_up: { variant: 'onTheWay', label: 'Picked Up' },
  on_the_way: { variant: 'onTheWay', label: 'On the Way' },
  delivered: { variant: 'delivered', label: 'Delivered' },
  cancelled: { variant: 'cancelled', label: 'Cancelled' },
  rejected: { variant: 'rejected', label: 'Rejected' },
  active: { variant: 'success', label: 'Active' },
  inactive: { variant: 'muted', label: 'Inactive' },
  suspended: { variant: 'destructive', label: 'Suspended' },
  verified: { variant: 'success', label: 'Verified' },
  unverified: { variant: 'warning', label: 'Unverified' },
  open: { variant: 'success', label: 'Open' },
  closed: { variant: 'destructive', label: 'Closed' },
  available: { variant: 'success', label: 'Available' },
  unavailable: { variant: 'muted', label: 'Unavailable' },
  completed: { variant: 'success', label: 'Completed' },
  failed: { variant: 'destructive', label: 'Failed' },
  refunded: { variant: 'info', label: 'Refunded' },
  online: { variant: 'success', label: 'Online' },
  offline: { variant: 'muted', label: 'Offline' },
};

export const StatusBadge = ({
  status,
  className,
}: StatusBadgeProps): React.JSX.Element => {
  const config = statusMap[status.toLowerCase()] ?? {
    variant: 'muted' as keyof typeof badgeVariants,
    label: status,
  };

  return (
    <Badge
      variant={config.variant}
      dot
      className={className}
    >
      {config.label}
    </Badge>
  );
};

// ─── Tag Badge ────────────────────────────────────────────────────────────────
export interface TagBadgeProps {
  tags: string[];
  maxVisible?: number;
  variant?: keyof typeof badgeVariants;
  size?: keyof typeof badgeSizes;
  onRemove?: (tag: string) => void;
  className?: string;
}

export const TagBadgeList = ({
  tags,
  maxVisible = 3,
  variant = 'muted',
  size = 'sm',
  onRemove,
  className,
}: TagBadgeProps): React.JSX.Element => {
  const visibleTags = tags.slice(0, maxVisible);
  const remainingCount = tags.length - maxVisible;

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {visibleTags.map((tag) => (
        <Badge
          key={tag}
          variant={variant}
          size={size}
          dismissible={Boolean(onRemove)}
          onDismiss={onRemove ? () => onRemove(tag) : undefined}
        >
          {tag}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge variant="muted" size={size}>
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
};

export default Badge;