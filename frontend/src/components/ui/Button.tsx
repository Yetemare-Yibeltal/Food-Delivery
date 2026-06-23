'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/lib/animations/variants';

// ─── Button Variants ──────────────────────────────────────────────────────────
const buttonStyles = {
  base: cn(
    'inline-flex items-center justify-center gap-2',
    'font-semibold rounded-lg',
    'transition-all duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-primary focus-visible:ring-offset-2',
    'focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none cursor-pointer',
    'whitespace-nowrap',
  ),
  variants: {
    primary: cn(
      'bg-primary text-primary-foreground',
      'hover:bg-primary/90 active:bg-primary/80',
      'shadow-sm hover:shadow-md',
    ),
    secondary: cn(
      'bg-secondary text-secondary-foreground',
      'hover:bg-secondary/90 active:bg-secondary/80',
      'shadow-sm hover:shadow-md',
    ),
    accent: cn(
      'bg-accent text-accent-foreground',
      'hover:bg-accent/90 active:bg-accent/80',
      'shadow-sm hover:shadow-md',
    ),
    outline: cn(
      'border-2 border-primary text-primary bg-transparent',
      'hover:bg-primary hover:text-primary-foreground',
      'active:bg-primary/90',
    ),
    outlineSecondary: cn(
      'border-2 border-border text-foreground bg-transparent',
      'hover:bg-muted active:bg-muted/80',
    ),
    ghost: cn(
      'text-foreground bg-transparent',
      'hover:bg-muted active:bg-muted/80',
    ),
    ghostPrimary: cn(
      'text-primary bg-transparent',
      'hover:bg-primary/10 active:bg-primary/20',
    ),
    destructive: cn(
      'bg-destructive text-destructive-foreground',
      'hover:bg-destructive/90 active:bg-destructive/80',
      'shadow-sm hover:shadow-md',
    ),
    link: cn(
      'text-primary bg-transparent underline-offset-4',
      'hover:underline active:opacity-80',
      'p-0 h-auto',
    ),
    glass: cn(
      'glass text-foreground',
      'hover:bg-white/20 active:bg-white/10',
      'border border-white/20',
    ),
  },
  sizes: {
    xs: 'h-7 px-2.5 text-xs rounded-md gap-1',
    sm: 'h-9 px-3.5 text-sm rounded-lg',
    md: 'h-11 px-5 text-sm rounded-lg',
    lg: 'h-12 px-6 text-base rounded-xl',
    xl: 'h-14 px-8 text-lg rounded-xl',
    icon: 'h-11 w-11 p-0 rounded-lg',
    'icon-sm': 'h-9 w-9 p-0 rounded-lg',
    'icon-xs': 'h-7 w-7 p-0 rounded-md',
    'icon-lg': 'h-12 w-12 p-0 rounded-xl',
  },
};

// ─── Button Props ─────────────────────────────────────────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonStyles.variants;
  size?: keyof typeof buttonStyles.sizes;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  animate?: boolean;
  href?: string;
}

// ─── Spinner Component ────────────────────────────────────────────────────────
const ButtonSpinner = ({ size }: { size: string }): React.JSX.Element => {
  const spinnerSize = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
    icon: 'w-4 h-4',
    'icon-sm': 'w-3.5 h-3.5',
    'icon-xs': 'w-3 h-3',
    'icon-lg': 'w-5 h-5',
  }[size] ?? 'w-4 h-4';

  return (
    <svg
      className={cn('animate-spin', spinnerSize)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

// ─── Button Component ─────────────────────────────────────────────────────────
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      animate = true,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    const buttonContent = (
      <>
        {isLoading ? (
          <ButtonSpinner size={size} />
        ) : (
          leftIcon && (
            <span className="shrink-0" aria-hidden="true">
              {leftIcon}
            </span>
          )
        )}
        {isLoading && loadingText ? (
          <span>{loadingText}</span>
        ) : (
          children && <span>{children}</span>
        )}
        {!isLoading && rightIcon && (
          <span className="shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </>
    );

    if (animate) {
      return (
        <motion.button
          ref={ref}
          className={cn(
            buttonStyles.base,
            buttonStyles.variants[variant],
            buttonStyles.sizes[size],
            fullWidth && 'w-full',
            className,
          )}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-busy={isLoading}
          variants={buttonVariants}
          initial="initial"
          whileHover={!isDisabled ? 'hover' : undefined}
          whileTap={!isDisabled ? 'tap' : undefined}
          {...(props as React.ComponentProps<typeof motion.button>)}
        >
          {buttonContent}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          buttonStyles.base,
          buttonStyles.variants[variant],
          buttonStyles.sizes[size],
          fullWidth && 'w-full',
          className,
        )}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {buttonContent}
      </button>
    );
  },
);

Button.displayName = 'Button';

// ─── Icon Button Component ────────────────────────────────────────────────────
export const IconButton = React.forwardRef
  HTMLButtonElement,
  Omit<ButtonProps, 'leftIcon' | 'rightIcon'> & {
    icon: React.ReactNode;
    'aria-label': string;
  }
>(({ icon, size = 'icon', ...props }, ref) => {
  return (
    <Button ref={ref} size={size} {...props}>
      {icon}
    </Button>
  );
});

IconButton.displayName = 'IconButton';

export default Button;