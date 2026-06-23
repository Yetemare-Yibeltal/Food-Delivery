import type { ITokenPayload } from '@yene/shared';

// ─── Extend Express Request ───────────────────────────────────────────────────
declare global {
  namespace Express {
    interface Request {
      // Authenticated user payload from JWT token
      user?: ITokenPayload;

      // Parsed and validated request data
      validatedBody?: Record<string, unknown>;
      validatedQuery?: Record<string, unknown>;
      validatedParams?: Record<string, unknown>;

      // File upload
      uploadedFile?: {
        publicId: string;
        url: string;
        secureUrl: string;
        width: number;
        height: number;
        format: string;
        bytes: number;
      };

      // Multiple uploaded files
      uploadedFiles?: {
        fieldname: string;
        publicId: string;
        url: string;
        secureUrl: string;
        width: number;
        height: number;
        format: string;
        bytes: number;
      }[];

      // Request ID for tracing
      requestId?: string;

      // Client IP address
      clientIp?: string;

      // Request start time for performance tracking
      startTime?: number;
    }
  }
}

export {};
