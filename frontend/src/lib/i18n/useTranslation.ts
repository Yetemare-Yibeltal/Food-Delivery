'use client';

import * as React from 'react';
import { translations, type Locale, type ITranslations } from './translations';

// ─── Storage Key ──────────────────────────────────────────────────────────────
const LANGUAGE_KEY = 'yene-delivery-language';

// ─── Get Initial Language ─────────────────────────────────────────────────────
const getInitialLanguage = (): Locale => {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(LANGUAGE_KEY) as Locale | null;
    if (stored === 'en' || stored === 'am') return stored;
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'am') return 'am';
  } catch {
    return 'en';
  }
  return 'en';
};

// ─── Language Context Type ────────────────────────────────────────────────────
interface ILanguageContext {
  locale: Locale;
  t: ITranslations;
  changeLanguage: (locale: Locale) => void;
  isAmharic: boolean;
}

// ─── Language Context ─────────────────────────────────────────────────────────
const LanguageContext = React.createContext<ILanguageContext>({
  locale: 'en',
  t: translations['en'],
  changeLanguage: () => undefined,
  isAmharic: false,
});

// ─── Language Provider ────────────────────────────────────────────────────────
export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [locale, setLocale] = React.useState<Locale>('en');

  // Set language from storage on mount
  React.useEffect(() => {
    const initial = getInitialLanguage();
    setLocale(initial);
    document.documentElement.lang = initial;
  }, []);

  const changeLanguage = React.useCallback((newLocale: Locale): void => {
    setLocale(newLocale);
    try {
      localStorage.setItem(LANGUAGE_KEY, newLocale);
    } catch {
      // ignore storage errors
    }
    document.documentElement.lang = newLocale;
  }, []);

  const value = React.useMemo<ILanguageContext>(
    () => ({
      locale,
      t: translations[locale],
      changeLanguage,
      isAmharic: locale === 'am',
    }),
    [locale, changeLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── useTranslation Hook ──────────────────────────────────────────────────────
export function useTranslation(): ILanguageContext {
  const context = React.useContext(LanguageContext);
  return context;
}

// ─── useLocale Hook ───────────────────────────────────────────────────────────
export function useLocale(): Locale {
  const { locale } = useTranslation();
  return locale;
}

// ─── useIsAmharic Hook ────────────────────────────────────────────────────────
export function useIsAmharic(): boolean {
  const { isAmharic } = useTranslation();
  return isAmharic;
}

// ─── Standalone translate function ────────────────────────────────────────────
export function translate(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[locale];
  for (const k of keys) {
    if (value !== null && typeof value === 'object' && k in (value as object)) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof value === 'string' ? value : key;
}

export default useTranslation;