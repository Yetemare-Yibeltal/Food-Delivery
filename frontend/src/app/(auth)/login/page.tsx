import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth/LoginForm';

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Sign In | Yene Delivery',
  description:
    'Sign in to your Yene Delivery account to order food from your favorite restaurants across Ethiopia.',
  openGraph: {
    title: 'Sign In | Yene Delivery',
    description: 'Sign in to your Yene Delivery account.',
    images: [{ url: '/og-image.png' }],
  },
};

// ─── Login Page ───────────────────────────────────────────────────────────────
export default function LoginPage(): React.JSX.Element {
  return <LoginForm />;
}