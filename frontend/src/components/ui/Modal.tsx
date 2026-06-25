'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';
import { backdropVariants, modalVariants } from '@/lib/animations/variants';
import { Button } from './Button';

// ─── Modal Sizes ──────────────────────────────────────────────────────────────
const modalSizes = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  full: 'max-w-full mx-4',
};

// ─── Modal Props ──────────────────────────────────────────────────────────────
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  size?: keyof typeof modalSizes;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  scrollable?: boolean;
  centered?: boolean;
}

// ─── Modal Component ──────────────────────────────────────────────────────────
export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  footer,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  scrollable = true,
  centered = true,
}: ModalProps): React.JSX.Element | null => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Close on Escape key
  React.useEffect(() => {
    if (!closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, closeOnEscape]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          className={cn(
            'fixed inset-0 z-50',
            'flex items-end sm:items-center justify-center',
            centered && 'sm:items-center',
            'p-0 sm:p-4',
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeOnBackdrop ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            className={cn(
              'relative z-50 w-full',
              'bg-card text-card-foreground',
              'rounded-t-2xl sm:rounded-2xl',
              'shadow-2xl',
              'border border-border',
              modalSizes[size],
              scrollable && 'max-h-[90vh] overflow-hidden flex flex-col',
              className,
            )}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div
                className={cn(
                  'flex items-start justify-between',
                  'px-6 pt-6 pb-4',
                  'border-b border-border',
                  'shrink-0',
                  headerClassName,
                )}
              >
                <div className="flex-1 min-w-0 pr-4">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-lg font-semibold text-foreground leading-tight"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p
                      id="modal-description"
                      className="text-sm text-muted-foreground mt-1"
                    >
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={onClose}
                    aria-label="Close modal"
                    className="shrink-0 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
            )}

            {/* Body */}
            <div
              className={cn(
                'px-6 py-4',
                scrollable && 'overflow-y-auto flex-1',
                contentClassName,
              )}
            >
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div
                className={cn(
                  'px-6 py-4',
                  'border-t border-border',
                  'flex items-center justify-end gap-3',
                  'shrink-0',
                  footerClassName,
                )}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

// ─── Confirm Modal ────────────────────────────────────────────────────────────
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'destructive' | 'secondary';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  isLoading = false,
  icon,
}: ConfirmModalProps): React.JSX.Element => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      footer={
        <>
          <Button
            variant="outlineSecondary"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            isLoading={isLoading}
            loadingText="Processing..."
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center gap-4 py-2">
        {icon && (
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-3xl">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

// ─── Alert Modal ──────────────────────────────────────────────────────────────
export interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  closeText?: string;
}

const alertIcons = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};

export const AlertModal = ({
  isOpen,
  onClose,
  title,
  description,
  type = 'info',
  closeText = 'OK',
}: AlertModalProps): React.JSX.Element => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      footer={
        <Button
          variant="primary"
          onClick={onClose}
          fullWidth
        >
          {closeText}
        </Button>
      }
    >
      <div className="flex flex-col items-center text-center gap-4 py-2">
        <div className="text-4xl">{alertIcons[type]}</div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

// ─── Use Modal Hook ───────────────────────────────────────────────────────────
export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = React.useState(initialState);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
};

export default Modal;