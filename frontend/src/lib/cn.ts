import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ─── CN Utility ───────────────────────────────────────────────────────────────
// Combines clsx and tailwind-merge for intelligent class merging
// Usage: cn('px-4 py-2', isActive && 'bg-primary', className)
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

// ─── CV Utility (Class Variants) ─────────────────────────────────────────────
// Helper for creating variant-based class strings
export const cv = (
  base: string,
  variants: Record<string, Record<string, string>>,
  selectedVariants: Record<string, string>,
  className?: string,
): string => {
  const variantClasses = Object.entries(selectedVariants)
    .map(([key, value]) => variants[key]?.[value] ?? '')
    .filter(Boolean)
    .join(' ');

  return cn(base, variantClasses, className);
};

// ─── Focus Ring ───────────────────────────────────────────────────────────────
export const focusRing = cn(
  'focus-visible:outline-none focus-visible:ring-2',
  'focus-visible:ring-primary focus-visible:ring-offset-2',
  'focus-visible:ring-offset-background',
);

// ─── Disabled ─────────────────────────────────────────────────────────────────
export const disabled = cn(
  'disabled:pointer-events-none disabled:opacity-50',
  'aria-disabled:pointer-events-none aria-disabled:opacity-50',
);

// ─── Transition ───────────────────────────────────────────────────────────────
export const transition = cn('transition-all duration-200 ease-in-out');

// ─── Interactive ──────────────────────────────────────────────────────────────
export const interactive = cn(transition, focusRing, disabled, 'cursor-pointer select-none');

export default cn;
