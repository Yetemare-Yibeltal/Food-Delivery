'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

// ─── Theme Provider ───────────────────────────────────────────────────────────
export const ThemeProvider = ({
  children,
  ...props
}: ThemeProviderProps): React.JSX.Element => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="yene-delivery-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
};

// ─── Use Theme Hook ───────────────────────────────────────────────────────────
export { useTheme } from 'next-themes';

export default ThemeProvider;