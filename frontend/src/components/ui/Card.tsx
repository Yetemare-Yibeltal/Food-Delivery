'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import { cardHoverVariants } from '@/lib/animations/variants';

// ─── Card Style Variants ──────────────────────────────────────────────────────
const cardStyles = {
  default: cn(
    'bg-card text-card-foreground',
    'border border-border',
    'rounded-xl',
    'shadow-card',
  ),
  glass: cn(
    'glass-card text-foreground',
    'rounded-xl',
  ),
  elevated: cn(
    'bg-card text-card-foreground',
    'border border-border',
    'rounded-xl',
    'shadow-lg',
  ),
  flat: cn(
    'bg-muted text-foreground',
    'rounded-xl',
    'border-0',
  ),
  outline: cn(
    'bg-transparent text-foreground',
    'border-2 border-border',
    'rounded-xl',
  ),
  primary: cn(
    'bg-primary text-primary-foreground',
    'rounded-xl',
    'shadow-md',
  ),
};

// ─── Padding Sizes ────────────────────────────────────────────────────────────
const paddingSizes = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

// ─── Card Props ───────────────────────────────────────────────────────────────
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof cardStyles;
  hoverable?: boolean;
  clickable?: boolean;
  animate?: boolean;
  padding?: keyof typeof paddingSizes;
  fullHeight?: boolean;
}

// ─── Card Component ───────────────────────────────────────────────────────────
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      hoverable = false,
      clickable = false,
      animate = false,
      padding = 'none',
      fullHeight = false,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const isInteractive = hoverable || clickable || Boolean(onClick);

    const classes = cn(
      cardStyles[variant],
      paddingSizes[padding],
      fullHeight && 'h-full',
      isInteractive && 'cursor-pointer transition-all duration-300',
      className,
    );

    if (animate || isInteractive) {
      return (
        <motion.div
          ref={ref}
          className={classes}
          variants={isInteractive ? cardHoverVariants : undefined}
          initial={isInteractive ? 'initial' : undefined}
          whileHover={isInteractive ? 'hover' : undefined}
          whileTap={isInteractive && clickable ? 'tap' : undefined}
          onClick={onClick}
          {...(props as React.ComponentProps<typeof motion.div>)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={classes} onClick={onClick} {...props}>
        {children}
      </div>
    );
  },
);
Card.displayName = 'Card';

// ─── Card Header Props ────────────────────────────────────────────────────────
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode;
}

// ─── Card Header ──────────────────────────────────────────────────────────────
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, action, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-start justify-between',
        'px-6 pt-6 pb-4',
        className,
      )}
      {...props}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {action && <div className="ml-4 flex-shrink-0">{action}</div>}
    </div>
  ),
);
CardHeader.displayName = 'CardHeader';

// ─── Card Title Props ─────────────────────────────────────────────────────────
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

// ─── Card Title ───────────────────────────────────────────────────────────────
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Tag = 'h3', children, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-tight tracking-tight text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  ),
);
CardTitle.displayName = 'CardTitle';

// ─── Card Description ─────────────────────────────────────────────────────────
export const CardDescription = React.forwardRef
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground mt-1', className)}
      {...props}
    />
  ),
);
CardDescription.displayName = 'CardDescription';

// ─── Card Content ─────────────────────────────────────────────────────────────
export const CardContent = React.forwardRef
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 pb-6', className)}
      {...props}
    />
  ),
);
CardContent.displayName = 'CardContent';

// ─── Card Footer Props ────────────────────────────────────────────────────────
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: 'start' | 'end' | 'between' | 'center';
}

// ─── Card Footer ──────────────────────────────────────────────────────────────
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, justify = 'start', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center px-6 py-4',
        'border-t border-border',
        justify === 'start' && 'justify-start',
        justify === 'end' && 'justify-end',
        justify === 'between' && 'justify-between',
        justify === 'center' && 'justify-center',
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';

// ─── Card Image Props ─────────────────────────────────────────────────────────
export interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4';
  className?: string;
  priority?: boolean;
  overlay?: boolean;
  overlayContent?: React.ReactNode;
}

// ─── Card Image ───────────────────────────────────────────────────────────────
export const CardImage = ({
  src,
  alt,
  aspectRatio = '16/9',
  className,
  priority = false,
  overlay = false,
  overlayContent,
}: CardImageProps): React.JSX.Element => {
  const aspectClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '3/4': 'aspect-[3/4]',
  };

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-t-xl',
        aspectClasses[aspectRatio],
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      )}
      {overlayContent && (
        <div className="absolute inset-0 flex items-end p-4">
          {overlayContent}
        </div>
      )}
    </div>
  );
};

// ─── Stats Card Props ─────────────────────────────────────────────────────────
export interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  className?: string;
}

// ─── Stats Card ───────────────────────────────────────────────────────────────
export const StatsCard = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconBg = 'bg-primary/10',
  className,
}: StatsCardProps): React.JSX.Element => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card className={cn('group', className)} hoverable animate>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {value}
            </p>
            {change !== undefined && (
              <p
                className={cn(
                  'text-xs font-medium mt-1 flex items-center gap-1',
                  isPositive ? 'text-success' : 'text-destructive',
                )}
              >
                <span>{isPositive ? '↑' : '↓'}</span>
                <span>
                  {Math.abs(change)}%{' '}
                  {changeLabel ?? 'vs last month'}
                </span>
              </p>
            )}
          </div>
          {icon && (
            <div
              className={cn(
                'w-12 h-12 rounded-xl',
                'flex items-center justify-center',
                'transition-transform duration-300 group-hover:scale-110',
                iconBg,
              )}
            >
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Card;