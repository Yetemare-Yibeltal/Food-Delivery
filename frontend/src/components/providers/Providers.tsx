'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/Toast';

// ─── App Providers ────────────────────────────────────────────────────────────
// All client-side providers are wrapped here to keep layout.tsx
// as a pure server component as required by Next.js 15 App Router
export function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
      storageKey="yene-delivery-theme"
    >
      {children}
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}

export default Providers;