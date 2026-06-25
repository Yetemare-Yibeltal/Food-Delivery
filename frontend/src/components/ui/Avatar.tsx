'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, User } from 'lucide-react';
import { cn } from '@/lib/cn';
import { scaleVariants } from '@/lib/animations/variants';

// ─── Avatar Sizes ─────────────────────────────────────────────────────────────
const avatarSizes = {
  xs: { container: 'w-6 h-6', text: 'text-[10px]', icon: 'w-3 h-3' },
  sm: { container: 'w-8 h-8', text: 'text-xs', icon: 'w-3.5 h-3.5' },
  md: { container: 'w-10 h-10', text: 'text-sm', icon: 'w-4 h-4' },
  lg: { container: 'w-12 h-12', text: 'text-base', icon: 'w-5 h-5' },
  xl: { container: 'w-16 h-16', text: 'text-lg', icon: 'w-6 h-6' },
  '2xl': { container: 'w-20 h-20', text: 'text-xl', icon: 'w-7 h-7' },
  '3xl': { container: 'w-24 h-24', text: 'text-2xl', icon: 'w-8 h-8' },
  '4xl': { container: 'w-32 h-32', text: 'text-3xl', icon: 'w-10 h-10' },
};

// ─── Avatar Colors ────────────────────────────────────────────────────────────
const avatarColors = [
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-purple-500',
  'bg-fuchsia-500',
  'bg-pink-500',
  'bg-rose-500',
];

// ─── Get Avatar Color ─────────────────────────────────────────────────────────
const getAvatarColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length] ?? avatarColors[0]!;
};

// ─── Get Initials ─────────────────────────────────────────────────────────────
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return (parts[0]?.slice(0, 2) ?? '').toUpperCase();
  }
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
};

// ─── Avatar Props ─────────────────────────────────────────────────────────────
export interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: keyof typeof avatarSizes;
  shape?: 'circle' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'busy' | 'away';
  showStatus?: boolean;
  className?: string;
  priority?: boolean;
  animate?: boolean;
  onClick?: () => void;
}

// ─── Status Colors ────────────────────────────────────────────────────────────
const statusColors = {
  online: 'bg-success',
  offline: 'bg-muted-foreground',
  busy: 'bg-destructive',
  away: 'bg-warning',
};

// ─── Status Sizes ─────────────────────────────────────────────────────────────
const statusSizes = {
  xs: 'w-1.5 h-1.5 border',
  sm: 'w-2 h-2 border',
  md: 'w-2.5 h-2.5 border-2',
  lg: 'w-3 h-3 border-2',
  xl: 'w-3.5 h-3.5 border-2',
  '2xl': 'w-4 h-4 border-2',
  '3xl': 'w-4 h-4 border-2',
  '4xl': 'w-5 h-5 border-2',
};

// ─── Shape Classes ────────────────────────────────────────────────────────────
const shapeClasses = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-xl',
};

// ─── Avatar Component ─────────────────────────────────────────────────────────
export const Avatar = ({
  src,
  name,
  size = 'md',
  shape = 'circle',
  status,
  showStatus = false,
  className,
  priority = false,
  animate = false,
  onClick,
}: AvatarProps): React.JSX.Element => {
  const [imageError, setImageError] = React.useState(false);
  const sizeConfig = avatarSizes[size];
  const initials = name ? getInitials(name) : null;
  const bgColor = name ? getAvatarColor(name) : 'bg-muted';
  const hasValidImage = src && !imageError;

  const avatarContent = (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        'shrink-0 overflow-hidden',
        'select-none',
        sizeConfig.container,
        shapeClasses[shape],
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      aria-label={name ? `${name}'s avatar` : 'Avatar'}
    >
      {hasValidImage ? (
        <Image
          src={src}
          alt={name ?? 'Avatar'}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100px, 200px"
          onError={() => setImageError(true)}
        />
      ) : initials ? (
        <div
          className={cn(
            'w-full h-full flex items-center justify-center',
            'text-white font-semibold',
            bgColor,
            sizeConfig.text,
          )}
          aria-hidden="true"
        >
          {initials}
        </div>
      ) : (
        <div
          className={cn(
            'w-full h-full flex items-center justify-center',
            'bg-muted text-muted-foreground',
          )}
          aria-hidden="true"
        >
          <User className={sizeConfig.icon} />
        </div>
      )}

      {/* Status Indicator */}
      {showStatus && status && (
        <span
          className={cn(
            'absolute bottom-0 right-0',
            'rounded-full border-background',
            statusColors[status],
            statusSizes[size],
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        variants={scaleVariants}
        initial="hidden"
        animate="visible"
        className="inline-flex"
      >
        {avatarContent}
      </motion.div>
    );
  }

  return avatarContent;
};

// ─── Avatar Group ─────────────────────────────────────────────────────────────
export interface AvatarGroupProps {
  avatars: Array<{
    src?: string | null;
    name: string;
  }>;
  max?: number;
  size?: keyof typeof avatarSizes;
  className?: string;
  spacing?: 'tight' | 'normal' | 'loose';
}

const spacingClasses = {
  tight: '-space-x-3',
  normal: '-space-x-2',
  loose: '-space-x-1',
};

export const AvatarGroup = ({
  avatars,
  max = 4,
  size = 'md',
  className,
  spacing = 'normal',
}: AvatarGroupProps): React.JSX.Element => {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div
      className={cn(
        'flex items-center',
        spacingClasses[spacing],
        className,
      )}
      aria-label={`${avatars.length} users`}
    >
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className="ring-2 ring-background rounded-full"
          style={{ zIndex: visibleAvatars.length - index }}
        >
          <Avatar
            src={avatar.src}
            name={avatar.name}
            size={size}
          />
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            'ring-2 ring-background rounded-full',
            'flex items-center justify-center',
            'bg-muted text-muted-foreground font-semibold',
            avatarSizes[size].container,
            avatarSizes[size].text,
          )}
          aria-label={`${remainingCount} more`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

// ─── Upload Avatar ────────────────────────────────────────────────────────────
export interface UploadAvatarProps {
  src?: string | null;
  name?: string;
  size?: keyof typeof avatarSizes;
  onUpload?: (file: File) => void;
  isLoading?: boolean;
  className?: string;
  accept?: string;
  maxSizeMB?: number;
  onError?: (error: string) => void;
}

export const UploadAvatar = ({
  src,
  name,
  size = '3xl',
  onUpload,
  isLoading = false,
  className,
  accept = 'image/jpeg,image/png,image/webp',
  maxSizeMB = 5,
  onError,
}: UploadAvatarProps): React.JSX.Element => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      onError?.(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    onUpload?.(file);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={cn('relative inline-flex', className)}>
      <Avatar
        src={src}
        name={name}
        size={size}
        shape="circle"
        animate
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isLoading}
        className={cn(
          'absolute bottom-0 right-0',
          'w-8 h-8 rounded-full',
          'bg-primary text-primary-foreground',
          'flex items-center justify-center',
          'border-2 border-background',
          'hover:bg-primary/90',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'shadow-md',
        )}
        aria-label="Upload profile picture"
      >
        {isLoading ? (
          <svg
            className="animate-spin w-3.5 h-3.5"
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
        ) : (
          <Camera className="w-3.5 h-3.5" aria-hidden="true" />
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
};

export default Avatar;