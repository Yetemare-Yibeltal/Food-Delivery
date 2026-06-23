'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { fadeDownVariants } from '@/lib/animations/variants';

// ─── Input Props ──────────────────────────────────────────────────────────────
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  isSuccess?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'flushed';
  required?: boolean;
  optional?: boolean;
}

// ─── Input Sizes ──────────────────────────────────────────────────────────────
const inputSizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-13 px-5 text-base',
};

const iconSizes = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const paddingWithLeftIcon = {
  sm: 'pl-8',
  md: 'pl-10',
  lg: 'pl-12',
};

const paddingWithRightIcon = {
  sm: 'pr-8',
  md: 'pr-10',
  lg: 'pr-12',
};

// ─── Input Variants ───────────────────────────────────────────────────────────
const inputVariants = {
  default: cn(
    'border border-border bg-background',
    'focus:border-primary focus:ring-2 focus:ring-primary/20',
    'hover:border-primary/50',
  ),
  filled: cn(
    'border border-transparent bg-muted',
    'focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20',
    'hover:bg-muted/80',
  ),
  flushed: cn(
    'border-b border-border bg-transparent rounded-none px-0',
    'focus:border-primary focus:ring-0',
    'hover:border-primary/50',
  ),
};

// ─── Input Component ──────────────────────────────────────────────────────────
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      isLoading = false,
      isSuccess = false,
      showCharCount = false,
      maxLength,
      containerClassName,
      labelClassName,
      inputClassName,
      size = 'md',
      variant = 'default',
      type = 'text',
      required = false,
      optional = false,
      disabled,
      className,
      id,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [charCount, setCharCount] = React.useState(
      typeof value === 'string' ? value.length : 0,
    );

    const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    const hasError = Boolean(error);
    const isDisabled = disabled || isLoading;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    const hasRightElement = rightIcon || isLoading || isSuccess || hasError || isPassword;

    return (
      <div className={cn('flex flex-col gap-1.5 w-full', containerClassName)}>
        {/* Label */}
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={inputId}
              className={cn(
                'text-sm font-medium text-foreground',
                isDisabled && 'opacity-50',
                labelClassName,
              )}
            >
              {label}
              {required && (
                <span className="text-destructive ml-1" aria-hidden="true">
                  *
                </span>
              )}
              {optional && (
                <span className="text-muted-foreground text-xs ml-1 font-normal">
                  (optional)
                </span>
              )}
            </label>
            {showCharCount && maxLength && (
              <span
                className={cn(
                  'text-xs text-muted-foreground',
                  charCount > maxLength * 0.9 && 'text-warning',
                  charCount >= maxLength && 'text-destructive',
                )}
              >
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}

        {/* Input Wrapper */}
        <div className="relative flex items-center">
          {/* Left Icon */}
          {leftIcon && (
            <div
              className={cn(
                'absolute left-3 flex items-center justify-center',
                'text-muted-foreground pointer-events-none',
                iconSizes[size],
              )}
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={isDisabled}
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            aria-required={required}
            className={cn(
              'w-full rounded-lg outline-none',
              'text-foreground placeholder:text-muted-foreground',
              'transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              inputSizes[size],
              inputVariants[variant],
              leftIcon && paddingWithLeftIcon[size],
              hasRightElement && paddingWithRightIcon[size],
              hasError && cn(
                'border-destructive',
                'focus:border-destructive focus:ring-destructive/20',
                'hover:border-destructive',
              ),
              isSuccess && !hasError && cn(
                'border-success',
                'focus:border-success focus:ring-success/20',
              ),
              inputClassName,
              className,
            )}
            {...props}
          />

          {/* Right Elements */}
          <div
            className={cn(
              'absolute right-3 flex items-center gap-1.5',
              'text-muted-foreground',
            )}
          >
            {isLoading && (
              <Loader2
                className={cn('animate-spin text-primary', iconSizes[size])}
                aria-hidden="true"
              />
            )}
            {!isLoading && isSuccess && !hasError && (
              <CheckCircle2
                className={cn('text-success', iconSizes[size])}
                aria-hidden="true"
              />
            )}
            {!isLoading && hasError && (
              <AlertCircle
                className={cn('text-destructive', iconSizes[size])}
                aria-hidden="true"
              />
            )}
            {!isLoading && isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={cn(
                  'flex items-center justify-center',
                  'text-muted-foreground hover:text-foreground',
                  'transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:text-foreground',
                  iconSizes[size],
                )}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={0}
              >
                {showPassword ? (
                  <EyeOff className="w-full h-full" />
                ) : (
                  <Eye className="w-full h-full" />
                )}
              </button>
            )}
            {!isLoading && !isPassword && !isSuccess && !hasError && rightIcon && (
              <span className={cn(iconSizes[size])} aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              id={`${inputId}-error`}
              role="alert"
              aria-live="polite"
              variants={fadeDownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-xs text-destructive flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Helper Text */}
        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-xs text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

// ─── Textarea Component ───────────────────────────────────────────────────────
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  required?: boolean;
  optional?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      showCharCount = false,
      containerClassName,
      labelClassName,
      required = false,
      optional = false,
      resize = 'vertical',
      disabled,
      id,
      maxLength,
      value,
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const [charCount, setCharCount] = React.useState(
      typeof value === 'string' ? value.length : 0,
    );
    const textareaId = id ?? `textarea-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = Boolean(error);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    const resizeClass = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    }[resize];

    return (
      <div className={cn('flex flex-col gap-1.5 w-full', containerClassName)}>
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={textareaId}
              className={cn(
                'text-sm font-medium text-foreground',
                disabled && 'opacity-50',
                labelClassName,
              )}
            >
              {label}
              {required && (
                <span className="text-destructive ml-1" aria-hidden="true">
                  *
                </span>
              )}
              {optional && (
                <span className="text-muted-foreground text-xs ml-1 font-normal">
                  (optional)
                </span>
              )}
            </label>
            {showCharCount && maxLength && (
              <span
                className={cn(
                  'text-xs text-muted-foreground',
                  charCount > maxLength * 0.9 && 'text-warning',
                  charCount >= maxLength && 'text-destructive',
                )}
              >
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          aria-invalid={hasError}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
                ? `${textareaId}-helper`
                : undefined
          }
          aria-required={required}
          className={cn(
            'w-full rounded-lg outline-none',
            'px-4 py-3 text-sm',
            'text-foreground placeholder:text-muted-foreground',
            'border border-border bg-background',
            'focus:border-primary focus:ring-2 focus:ring-primary/20',
            'hover:border-primary/50',
            'transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'min-h-[100px]',
            resizeClass,
            hasError && cn(
              'border-destructive',
              'focus:border-destructive focus:ring-destructive/20',
            ),
            className,
          )}
          {...props}
        />

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              id={`${textareaId}-error`}
              role="alert"
              aria-live="polite"
              variants={fadeDownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-xs text-destructive flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {!error && helperText && (
          <p
            id={`${textareaId}-helper`}
            className="text-xs text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export default Input;