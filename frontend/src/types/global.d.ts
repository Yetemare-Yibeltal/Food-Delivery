import type React from 'react';

// ─── Global React Types ───────────────────────────────────────────────────────
declare global {
  // Make React available globally without importing
  const React: typeof import('react');

  // ─── Environment Variables ──────────────────────────────────────────────
  namespace NodeJS {
    interface ProcessEnv {
      // App
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_APP_NAME: string;
      NEXT_PUBLIC_APP_ENV: 'development' | 'staging' | 'production';

      // API
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_WS_URL: string;

      // Auth
      NEXT_PUBLIC_JWT_EXPIRES_IN: string;

      // Maps
      NEXT_PUBLIC_GOOGLE_MAPS_KEY: string;

      // Analytics
      NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: string;
      NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: string;

      // Payment
      NEXT_PUBLIC_CHAPA_PUBLIC_KEY: string;

      // Cloudinary
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
      NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: string;

      // Feature flags
      NEXT_PUBLIC_ENABLE_GOOGLE_AUTH: string;
      NEXT_PUBLIC_ENABLE_TELEBIRR_AUTH: string;
      NEXT_PUBLIC_MAINTENANCE_MODE: string;

      // Node
      NODE_ENV: 'development' | 'test' | 'production';
    }
  }

  // ─── Window Extensions ──────────────────────────────────────────────────
  interface Window {
    // Google Maps
    google: typeof google;

    // Telebirr SDK
    TelebirrSDK?: {
      pay: (params: {
        appId: string;
        appKey: string;
        nonce: string;
        notifyUrl: string;
        outTradeNo: string;
        shortCode: string;
        subject: string;
        timeoutExpress: string;
        timestamp: string;
        totalAmount: string;
        sign: string;
      }) => Promise<{ code: string; message: string }>;
    };

    // CBE Birr SDK
    CBEBirrSDK?: {
      initialize: (config: { merchantCode: string; environment: string }) => void;
      pay: (params: {
        amount: number;
        orderId: string;
        description: string;
        callbackUrl: string;
      }) => Promise<{ success: boolean; transactionId: string }>;
    };
  }

  // ─── Custom JSX Element Types ───────────────────────────────────────────
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: React.DetailedHTMLProps
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

// ─── Module Declarations ───────────────────────────────────────────────────────

// SVG files
declare module '*.svg' {
  import type React from 'react';
  const ReactComponent: React.FunctionComponent
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}

// Image files
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

// CSS modules
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}

// ─── Utility Types ────────────────────────────────────────────────────────────
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Maybe<T> = T | null | undefined;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type ValueOf<T> = T[keyof T];

type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type AsyncFunction<T = void> = () => Promise<T>;

type AsyncFunctionWithArg<TArg, TReturn = void> = (
  arg: TArg,
) => Promise<TReturn>;

// ─── API Types ────────────────────────────────────────────────────────────────
interface IApiError {
  success: false;
  message: string;
  errors?: Array<{
    field?: string;
    message: string;
  }>;
  statusCode: number;
}

interface IApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

interface IPaginatedResponse<T> {
  success: true;
  message: string;
  data: {
    items: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

type ApiResponse<T> = IApiSuccess<T> | IApiError;

export {};