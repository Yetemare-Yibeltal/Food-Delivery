'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';
import { toastVariants } from '@/lib/animations/variants';

// ─── Toast Types ──────────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

// ─── Toast Interface ──────────────────────────────────────────────────────────
export interface IToast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  showProgress?: boolean;
  icon?: React.ReactNode;
}

// ─── Toast Config ─────────────────────────────────────────────────────────────
const toastConfig = {
  success: {
    icon: CheckCircle2,
    containerClass: cn(
      'bg-card border border-success/30',
      'shadow-lg shadow-success/10',
    ),
    iconClass: 'text-success',
    progressClass: 'bg-success',
    titleClass: 'text-foreground',
  },
  error: {
    icon: AlertCircle,
    containerClass: cn(
      'bg-card border border-destructive/30',
      'shadow-lg shadow-destructive/10',
    ),
    iconClass: 'text-destructive',
    progressClass: 'bg-destructive',
    titleClass: 'text-foreground',
  },
  warning: {
    icon: AlertTriangle,
    containerClass: cn(
      'bg-card border border-warning/30',
      'shadow-lg shadow-warning/10',
    ),
    iconClass: 'text-warning',
    progressClass: 'bg-warning',
    titleClass: 'text-foreground',
  },
  info: {
    icon: Info,
    containerClass: cn(
      'bg-card border border-info/30',
      'shadow-lg shadow-info/10',
    ),
    iconClass: 'text-info',
    progressClass: 'bg-info',
    titleClass: 'text-foreground',
  },
};

// ─── Position Classes ─────────────────────────────────────────────────────────
const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-left': 'top-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

// ─── Single Toast Component ───────────────────────────────────────────────────
interface ToastItemProps {
  toast: IToast;
  onDismiss: (id: string) => void;
}

const ToastItem = ({ toast, onDismiss }: ToastItemProps): React.JSX.Element => {
  const [progress, setProgress] = React.useState(100);
  const duration = toast.duration ?? 5000;
  const config = toastConfig[toast.type];
  const IconComponent = config.icon;
  const startTimeRef = React.useRef(Date.now());
  const animationFrameRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (!toast.showProgress && duration !== Infinity) {
      const timer = setTimeout(() => {
        onDismiss(toast.id);
        toast.onDismiss?.();
      }, duration);
      return () => clearTimeout(timer);
    }

    if (toast.showProgress && duration !== Infinity) {
      const animate = (): void => {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);

        if (remaining > 0) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          onDismiss(toast.id);
          toast.onDismiss?.();
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [toast, duration, onDismiss]);

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        'relative w-full max-w-sm',
        'rounded-xl overflow-hidden',
        'pointer-events-auto',
        config.containerClass,
      )}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Progress Bar */}
      {toast.showProgress && duration !== Infinity && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
          <div
            className={cn('h-full transition-none', config.progressClass)}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <div className="shrink-0 mt-0.5">
          {toast.icon ?? (
            <IconComponent
              className={cn('w-5 h-5', config.iconClass)}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={cn('text-sm font-semibold leading-tight', config.titleClass)}>
            {toast.title}
          </p>
          {toast.description && (
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {toast.description}
            </p>
          )}
          {toast.action && (
            <button
              type="button"
              onClick={() => {
                toast.action?.onClick();
                onDismiss(toast.id);
              }}
              className={cn(
                'mt-2 text-xs font-semibold',
                'underline underline-offset-2',
                config.iconClass,
                'hover:opacity-80 transition-opacity',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current rounded',
              )}
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            onDismiss(toast.id);
            toast.onDismiss?.();
          }}
          className={cn(
            'shrink-0 p-1 rounded-lg',
            'text-muted-foreground hover:text-foreground',
            'hover:bg-muted',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          )}
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
};

// ─── Toast Container ──────────────────────────────────────────────────────────
export interface ToastContainerProps {
  toasts: IToast[];
  onDismiss: (id: string) => void;
  position?: ToastPosition;
}

export const ToastContainer = ({
  toasts,
  onDismiss,
  position = 'top-right',
}: ToastContainerProps): React.JSX.Element | null => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        'fixed z-[1080] flex flex-col gap-3',
        'w-full max-w-sm',
        'pointer-events-none',
        positionClasses[position],
      )}
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={onDismiss}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
};

// ─── Toast Store ──────────────────────────────────────────────────────────────
type ToastListener = (toasts: IToast[]) => void;

class ToastStore {
  private toasts: IToast[] = [];
  private listeners: Set<ToastListener> = new Set();

  subscribe(listener: ToastListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  add(toast: Omit<IToast, 'id'>): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    this.toasts = [...this.toasts, { ...toast, id }];
    this.notify();
    return id;
  }

  dismiss(id: string): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  dismissAll(): void {
    this.toasts = [];
    this.notify();
  }

  getToasts(): IToast[] {
    return [...this.toasts];
  }
}

export const toastStore = new ToastStore();

// ─── Toast API ────────────────────────────────────────────────────────────────
export const toast = {
  success: (title: string, options?: Partial<Omit<IToast, 'id' | 'type' | 'title'>>) =>
    toastStore.add({ type: 'success', title, showProgress: true, ...options }),

  error: (title: string, options?: Partial<Omit<IToast, 'id' | 'type' | 'title'>>) =>
    toastStore.add({ type: 'error', title, duration: 7000, showProgress: true, ...options }),

  warning: (title: string, options?: Partial<Omit<IToast, 'id' | 'type' | 'title'>>) =>
    toastStore.add({ type: 'warning', title, showProgress: true, ...options }),

  info: (title: string, options?: Partial<Omit<IToast, 'id' | 'type' | 'title'>>) =>
    toastStore.add({ type: 'info', title, showProgress: true, ...options }),

  dismiss: (id: string) => toastStore.dismiss(id),

  dismissAll: () => toastStore.dismissAll(),
};

// ─── Use Toast Hook ───────────────────────────────────────────────────────────
export const useToast = () => {
  const [toasts, setToasts] = React.useState<IToast[]>(() =>
    toastStore.getToasts(),
  );

  React.useEffect(() => {
    return toastStore.subscribe(setToasts);
  }, []);

  return {
    toasts,
    toast,
    dismiss: toastStore.dismiss.bind(toastStore),
    dismissAll: toastStore.dismissAll.bind(toastStore),
  };
};

// ─── Toaster Component ────────────────────────────────────────────────────────
export interface ToasterProps {
  position?: ToastPosition;
}

export const Toaster = ({
  position = 'top-right',
}: ToasterProps): React.JSX.Element => {
  const { toasts, dismiss } = useToast();

  return (
    <ToastContainer
      toasts={toasts}
      onDismiss={dismiss}
      position={position}
    />
  );
};

export default Toaster;