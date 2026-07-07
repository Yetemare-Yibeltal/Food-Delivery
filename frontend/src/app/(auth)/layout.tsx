import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_INFO } from '@yene/shared';

export const metadata: Metadata = {
  title: {
    template: '%s | Yene Delivery',
    default: 'Auth | Yene Delivery',
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* ─── Left Side — Branding ──────────────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/10" aria-hidden="true" />
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />

        {/* Animated orbs specific to auth */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" aria-hidden="true" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
            <span className="text-2xl" aria-hidden="true">🍽️</span>
          </div>
          <div>
            <p className="font-heading font-black text-xl leading-none gradient-text">
              {APP_INFO.NAME}
            </p>
            <p className="text-xs font-amharic text-white/40 leading-none mt-0.5">
              {APP_INFO.NAME_AM}
            </p>
          </div>
        </Link>

        {/* Center Content */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h1 className="heading-xl text-white">
              Food Delivery
              <br />
              <span className="gradient-text">Across Ethiopia</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-sm">
              Join thousands of Ethiopians ordering from their favorite restaurants
              across 6 cities.
            </p>
            <p className="font-amharic text-white/40">
              በኢትዮጵያ ምርጥ ምግቦችን ያዝዙ
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '500+', label: 'Restaurants' },
              { value: '50K+', label: 'Customers' },
              { value: '6', label: 'Cities' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-4 text-center"
              >
                <p className="text-2xl font-black gradient-text">{stat.value}</p>
                <p className="text-xs text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="text-accent text-sm" aria-hidden="true">★</span>
              ))}
            </div>
            <p className="text-white/70 text-sm leading-relaxed italic">
              &ldquo;Yene Delivery changed how I order food. Fast, reliable and the
              Telebirr payment makes it so easy!&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold text-white">
                B
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Bethelhem T.</p>
                <p className="text-white/40 text-xs">Addis Ababa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} {APP_INFO.NAME}. All rights reserved.
          </p>
        </div>
      </div>

      {/* ─── Right Side — Form ─────────────────────────────────────── */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">
        {/* Mobile Logo */}
        <div className="lg:hidden mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
              <span className="text-2xl" aria-hidden="true">🍽️</span>
            </div>
            <div>
              <p className="font-heading font-black text-xl leading-none gradient-text">
                {APP_INFO.NAME}
              </p>
              <p className="text-xs font-amharic text-white/40 leading-none mt-0.5">
                {APP_INFO.NAME_AM}
              </p>
            </div>
          </Link>
        </div>

        {/* Form Content */}
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}