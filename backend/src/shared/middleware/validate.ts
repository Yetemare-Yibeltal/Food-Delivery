import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema, ZodError } from 'zod';
import { HTTP_STATUS } from '@yene/shared';

// ─── Validation Target ────────────────────────────────────────────────────────
type ValidationTarget = 'body' | 'query' | 'params';

// ─── Format Zod Errors ────────────────────────────────────────────────────────
const formatZodErrors = (error: ZodError) => {
  return error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
    code: err.code,
  }));
};

// ─── Validate Middleware ──────────────────────────────────────────────────────
export const validate = (schema: ZodSchema, target: ValidationTarget = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
        success: false,
        status: 'fail',
        message: 'Validation failed. Please check your input.',
        errors: formatZodErrors(result.error),
      });
      return;
    }

    // Replace request data with parsed and sanitized data
    req[target] = result.data as (typeof req)[typeof target];
    next();
  };
};

// ─── Validate Body ────────────────────────────────────────────────────────────
export const validateBody = (schema: ZodSchema) => validate(schema, 'body');

// ─── Validate Query ───────────────────────────────────────────────────────────
export const validateQuery = (schema: ZodSchema) => validate(schema, 'query');

// ─── Validate Params ──────────────────────────────────────────────────────────
export const validateParams = (schema: ZodSchema) => validate(schema, 'params');

// ─── Validate Multiple Targets ────────────────────────────────────────────────
export const validateRequest = (schemas: {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const allErrors: { field: string; message: string; code?: string }[] = [];

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        allErrors.push(
          ...formatZodErrors(result.error).map((err) => ({
            ...err,
            field: `body.${err.field}`,
          })),
        );
      } else {
        req.body = result.data as typeof req.body;
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        allErrors.push(
          ...formatZodErrors(result.error).map((err) => ({
            ...err,
            field: `query.${err.field}`,
          })),
        );
      } else {
        req.query = result.data as typeof req.query;
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        allErrors.push(
          ...formatZodErrors(result.error).map((err) => ({
            ...err,
            field: `params.${err.field}`,
          })),
        );
      } else {
        req.params = result.data as typeof req.params;
      }
    }

    if (allErrors.length > 0) {
      res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
        success: false,
        status: 'fail',
        message: 'Validation failed. Please check your input.',
        errors: allErrors,
      });
      return;
    }

    next();
  };
};

export default validate;
