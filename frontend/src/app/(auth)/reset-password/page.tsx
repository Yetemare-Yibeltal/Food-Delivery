import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ResetPasswordForm } from '@/features/auth/ResetPasswordForm';

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Reset Password | Yene Delivery',
  description:
    'Create a new strong password for your Yene Delivery account. Your account security is our priority.',
  openGraph: {
    title: 'Reset Password | Yene Delivery',
    description: 'Create a new password for your Yene Delivery account.',
    images: [{ url: '/og-image.png' }],
  },
  robots: {
    index: false,
    follow: false,
  },
};

// ─── Loading Fallback ─────────────────────────────────────────────────────────
function ResetPasswordLoading(): React.JSX.Element {
  return (
    <div className="w-full space-y-8">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-white/5 animate-pulse" />
        <div className="space-y-2">
          <div className="h-8 bg-white/5 rounded-xl animate-pulse w-48" />
          <div className="h-4 bg-white/5 rounded-lg animate-pulse w-32" />
        </div>
        <div className="h-4 bg-white/5 rounded-lg animate-pulse w-72" />
      </div>

      {/* Form skeleton */}
      <div className="space-y-5">
        {/* Password field skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-white/5 rounded-lg animate-pulse w-28" />
          <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
        </div>

        {/* Strength indicator skeleton */}
        <div className="space-y-2">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-1 flex-1 bg-white/5 rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        {/* Confirm password skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-white/5 rounded-lg animate-pulse w-36" />
          <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
        </div>

        {/* Button skeleton */}
        <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

// ─── Reset Password Page ──────────────────────────────────────────────────────
export default function ResetPasswordPage(): React.JSX.Element {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordForm />
    </Suspense>
  );
}