'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/Toast';

// ─── Create QueryClient ───────────────────────────────────────────────────────
function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: (failureCount, error) => {
          if (
            error instanceof Error &&
            'status' in error &&
            (error as { status?: number }).status === 401
          ) {
            return false;
          }
          return failureCount < 2;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: true,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

// ─── Singleton QueryClient for browser ───────────────────────────────────────
let browserQueryClient: QueryClient | undefined;

function getQueryClient(): QueryClient {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

// ─── Providers Component ──────────────────────────────────────────────────────
export function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        forcedTheme="dark"
        storageKey="yene-delivery-theme"
      >
        {/* ─── Animated Background Orbs ─────────────────────────────── */}
        <div className="orb-container" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="orb orb-4" />
          <div className="orb orb-5" />
        </div>

        {/* ─── App Content ──────────────────────────────────────────── */}
        {children}

        {/* ─── Toast Notifications ──────────────────────────────────── */}
        <Toaster position="top-right" />

        {/* ─── React Query Devtools (dev only) ──────────────────────── */}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default Providers;