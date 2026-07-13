import type { Metadata } from 'next';
import { RegisterForm } from '@/features/auth/RegisterForm';

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Create Account | Yene Delivery',
  description:
    'Create your free Yene Delivery account and start ordering food from hundreds of restaurants across Ethiopia. Fast delivery to your door.',
  openGraph: {
    title: 'Create Account | Yene Delivery',
    description:
      'Join thousands of Ethiopians ordering food on Yene Delivery.',
    images: [{ url: '/og-image.png' }],
  },
};

// ─── Register Page ────────────────────────────────────────────────────────────
export default function RegisterPage(): React.JSX.Element {
  return <RegisterForm />;
}