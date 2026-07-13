import type { Metadata } from 'next';
import { ForgotPasswordForm } from '@/features/auth/ForgotPasswordForm';

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Forgot Password | Yene Delivery',
  description:
    'Reset your Yene Delivery account password. Enter your email address and we will send you a verification code to reset your password.',
  openGraph: {
    title: 'Forgot Password | Yene Delivery',
    description:
      'Reset your Yene Delivery account password securely.',
    images: [{ url: '/og-image.png' }],
  },
  robots: {
    index: false,
    follow: false,
  },
};

// ─── Forgot Password Page ─────────────────────────────────────────────────────
export default function ForgotPasswordPage(): React.JSX.Element {
  return <ForgotPasswordForm />;
}