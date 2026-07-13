import type { Metadata } from 'next';
import { Suspense } from 'react';
import { OtpForm } from '@/features/auth/OtpForm';

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Verify OTP | Yene Delivery',
  description:
    'Verify your email address with the one-time code sent to your inbox to activate your Yene Delivery account.',
  openGraph: {
    title: 'Verify OTP | Yene Delivery',
    description: 'Verify your email address to activate your account.',
    images: [{ url: '/og-image.png' }],
  },
};

// ─── Loading Fallback ─────────────────────────────────────────────────────────
function OtpFormLoading(): React.JSX.Element {
  return (
    <div className="w-full space-y-8">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-white/5 animate-pulse mx-auto" />
        <div className="space-y-2 text-center">
          <div className="h-8 bg-white/5 rounded-xl animate-pulse w-48 mx-auto" />
          <div className="h-4 bg-white/5 rounded-lg animate-pulse w-32 mx-auto" />
        </div>
        <div className="h-4 bg-white/5 rounded-lg animate-pulse w-64 mx-auto" />
      </div>

      {/* OTP boxes skeleton */}
      <div className="flex items-center justify-center gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-12 h-14 rounded-xl bg-white/5 animate-pulse"
          />
        ))}
      </div>

      {/* Button skeleton */}
      <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
    </div>
  );
}

// ─── Verify OTP Page ──────────────────────────────────────────────────────────
export default function VerifyOtpPage(): React.JSX.Element {
  return (
    <Suspense fallback={<OtpFormLoading />}>
      <OtpForm />
    </Suspense>
  );
}