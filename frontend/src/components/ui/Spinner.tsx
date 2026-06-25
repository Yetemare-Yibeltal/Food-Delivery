'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { APP_INFO } from '@yene/shared';

// ─── Spinner Sizes ────────────────────────────────────────────────────────────
const spinnerSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
  '2xl': 'w-16 h-16',
};

// ─── Spinner Colors ───────────────────────────────────────────────────────────
const spinnerColors = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  white: 'text-white',
  muted: 'text-muted-foreground',
  destructive: 'text-destructive',
  success: 'text-success',
};

// ─── Spinner Props ────────────────────────────────────────────────────────────
export interface SpinnerProps {
  size?: keyof typeof spinnerSizes;
  color?: keyof typeof spinnerColors;
  className?: string;
  label?: string;
  variant?: 'spin' | 'dots' | 'pulse' | 'bars' | 'ring';
}

// ─── Spin Variant ─────────────────────────────────────────────────────────────
const SpinVariant = ({
  size,
  color,
  className,
}: Pick<SpinnerProps, 'size' | 'color' | 'className'>): React.JSX.Element => (
  <svg
    className={cn(
      'animate-spin',
      spinnerSizes[size ?? 'md'],
      spinnerColors[color ?? 'primary'],
      className,
    )}
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

// ─── Ring Variant ─────────────────────────────────────────────────────────────
const RingVariant = ({
  size,
  color,
  className,
}: Pick<SpinnerProps, 'size' | 'color' | 'className'>): React.JSX.Element => (
  <div
    className={cn(
      'animate-spin rounded-full',
      'border-4 border-current border-t-transparent',
      spinnerSizes[size ?? 'md'],
      spinnerColors[color ?? 'primary'],
      className,
    )}
    aria-hidden="true"
  />
);

// ─── Dots Variant ─────────────────────────────────────────────────────────────
const DotsVariant = ({
  color,
  className,
}: Pick<SpinnerProps, 'color' | 'className'>): React.JSX.Element => (
  <div
    className={cn(
      'flex items-center gap-1',
      spinnerColors[color ?? 'primary'],
      className,
    )}
    aria-hidden="true"
  >
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-current"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: i * 0.15,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

// ─── Pulse Variant ────────────────────────────────────────────────────────────
const PulseVariant = ({
  size,
  color,
  className,
}: Pick<SpinnerProps, 'size' | 'color' | 'className'>): React.JSX.Element => (
  <div
    className={cn(
      'rounded-full bg-current',
      'animate-ping',
      spinnerSizes[size ?? 'md'],
      spinnerColors[color ?? 'primary'],
      className,
    )}
    aria-hidden="true"
  />
);

// ─── Bars Variant ─────────────────────────────────────────────────────────────
const BarsVariant = ({
  color,
  className,
}: Pick<SpinnerProps, 'color' | 'className'>): React.JSX.Element => (
  <div
    className={cn(
      'flex items-end gap-0.5 h-5',
      spinnerColors[color ?? 'primary'],
      className,
    )}
    aria-hidden="true"
  >
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="w-1 bg-current rounded-full"
        animate={{
          height: ['40%', '100%', '40%'],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: i * 0.15,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

// ─── Spinner Component ────────────────────────────────────────────────────────
export const Spinner = ({
  size = 'md',
  color = 'primary',
  className,
  label = 'Loading...',
  variant = 'spin',
}: SpinnerProps): React.JSX.Element => {
  const variants = {
    spin: <SpinVariant size={size} color={color} className={className} />,
    ring: <RingVariant size={size} color={color} className={className} />,
    dots: <DotsVariant color={color} className={className} />,
    pulse: <PulseVariant size={size} color={color} className={className} />,
    bars: <BarsVariant color={color} className={className} />,
  };

  return (
    <span role="status" aria-label={label}>
      {variants[variant]}
      <span className="sr-only">{label}</span>
    </span>
  );
};

// ─── Full Page Loader ─────────────────────────────────────────────────────────
export interface FullPageLoaderProps {
  message?: string;
  showLogo?: boolean;
}

export const FullPageLoader = ({
  message = 'Loading...',
  showLogo = true,
}: FullPageLoaderProps): React.JSX.Element => (
  <div
    className={cn(
      'fixed inset-0 z-[9999]',
      'flex flex-col items-center justify-center',
      'bg-background',
      'gap-6',
    )}
    role="status"
    aria-label={message}
  >
    {showLogo && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-2"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
          <span className="text-3xl">🍽️</span>
        </div>
        <span className="text-lg font-bold gradient-text">
          {APP_INFO.NAME}
        </span>
      </motion.div>
    )}
    <div className="flex flex-col items-center gap-3">
      <Spinner size="lg" variant="ring" />
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
    <span className="sr-only">{message}</span>
  </div>
);

// ─── Inline Loader ────────────────────────────────────────────────────────────
export interface InlineLoaderProps {
  message?: string;
  size?: keyof typeof spinnerSizes;
  className?: string;
}

export const InlineLoader = ({
  message,
  size = 'md',
  className,
}: InlineLoaderProps): React.JSX.Element => (
  <div
    className={cn(
      'flex items-center justify-center gap-3',
      'py-8',
      className,
    )}
    role="status"
  >
    <Spinner size={size} variant="ring" />
    {message && (
      <p className="text-sm text-muted-foreground">{message}</p>
    )}
    <span className="sr-only">{message ?? 'Loading...'}</span>
  </div>
);

// ─── Section Loader ───────────────────────────────────────────────────────────
export interface SectionLoaderProps {
  message?: string;
  className?: string;
  minHeight?: string;
}

export const SectionLoader = ({
  message = 'Loading...',
  className,
  minHeight = 'min-h-[200px]',
}: SectionLoaderProps): React.JSX.Element => (
  <div
    className={cn(
      'flex flex-col items-center justify-center gap-4',
      minHeight,
      className,
    )}
    role="status"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary"
      aria-hidden="true"
    />
    <p className="text-sm text-muted-foreground">{message}</p>
    <span className="sr-only">{message}</span>
  </div>
);

// ─── Button Spinner ───────────────────────────────────────────────────────────
export const ButtonSpinner = ({
  className,
}: {
  className?: string;
}): React.JSX.Element => (
  <svg
    className={cn('animate-spin w-4 h-4', className)}
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

export default Spinner;