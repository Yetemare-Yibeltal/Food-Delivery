'use client';

import * as React from 'react';

// ─── useLocalStorage Hook ─────────────────────────────────────────────────────
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = React.useCallback(
    (value: T | ((prev: T) => T)): void => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch {
        console.warn(`Failed to set localStorage key "${key}"`);
      }
    },
    [key, storedValue],
  );

  const removeValue = React.useCallback((): void => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch {
      console.warn(`Failed to remove localStorage key "${key}"`);
    }
  }, [key, initialValue]);

  // Sync across tabs
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue) as T);
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
