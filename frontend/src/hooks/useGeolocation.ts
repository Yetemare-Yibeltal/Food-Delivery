'use client';

import * as React from 'react';

// ─── Geolocation State ────────────────────────────────────────────────────────
interface IGeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: string | null;
  isLoading: boolean;
  isSupported: boolean;
}

// ─── useGeolocation Hook ──────────────────────────────────────────────────────
export function useGeolocation(options?: PositionOptions): IGeolocationState & {
  getLocation: () => void;
} {
  const [state, setState] = React.useState<IGeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    isLoading: false,
    isSupported: typeof navigator !== 'undefined' && 'geolocation' in navigator,
  });

  const getLocation = React.useCallback((): void => {
    if (!state.isSupported) {
      setState((prev) => ({
        ...prev,
        error: 'Geolocation is not supported by your browser.',
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
          isLoading: false,
          isSupported: true,
        });
      },
      (error) => {
        const messages: Record<number, string> = {
          1: 'Location access denied. Please enable location permissions.',
          2: 'Location unavailable. Please try again.',
          3: 'Location request timed out. Please try again.',
        };

        setState((prev) => ({
          ...prev,
          error: messages[error.code] ?? 'Failed to get location.',
          isLoading: false,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
        ...options,
      },
    );
  }, [state.isSupported, options]);

  return { ...state, getLocation };
}

export default useGeolocation;
