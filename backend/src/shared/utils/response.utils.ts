import type { Response } from 'express';
import { HTTP_STATUS } from '@yene/shared';
import type { IPaginationMeta } from './pagination.utils';

// ─── Base Response Interface ──────────────────────────────────────────────────
interface IBaseResponse {
  success: boolean;
  message: string;
}

// ─── Success Response Interface ───────────────────────────────────────────────
interface ISuccessResponse<T> extends IBaseResponse {
  success: true;
  data: T;
  meta?: IPaginationMeta;
}

// ─── Error Response Interface ─────────────────────────────────────────────────
interface IErrorResponse extends IBaseResponse {
  success: false;
  errors?: { field?: string; message: string }[];
}

// ─── Send Success Response ────────────────────────────────────────────────────
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = HTTP_STATUS.OK,
): Response => {
  const response: ISuccessResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

// ─── Send Created Response ────────────────────────────────────────────────────
export const sendCreated = <T>(
  res: Response,
  data: T,
  message: string = 'Created successfully',
): Response => {
  return sendSuccess(res, data, message, HTTP_STATUS.CREATED);
};

// ─── Send No Content Response ─────────────────────────────────────────────────
export const sendNoContent = (res: Response): Response => {
  return res.status(HTTP_STATUS.NO_CONTENT).send();
};

// ─── Send Paginated Response ──────────────────────────────────────────────────
export const sendPaginated = <T>(
  res: Response,
  data: T[],
  meta: IPaginationMeta,
  message: string = 'Data retrieved successfully',
): Response => {
  const response: ISuccessResponse<T[]> = {
    success: true,
    message,
    data,
    meta,
  };
  return res.status(HTTP_STATUS.OK).json(response);
};

// ─── Send Error Response ──────────────────────────────────────────────────────
export const sendError = (
  res: Response,
  message: string = 'Something went wrong',
  statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  errors?: { field?: string; message: string }[],
): Response => {
  const response: IErrorResponse = {
    success: false,
    message,
    errors,
  };
  return res.status(statusCode).json(response);
};

// ─── Send Bad Request ─────────────────────────────────────────────────────────
export const sendBadRequest = (
  res: Response,
  message: string = 'Bad request',
  errors?: { field?: string; message: string }[],
): Response => {
  return sendError(res, message, HTTP_STATUS.BAD_REQUEST, errors);
};

// ─── Send Unauthorized ────────────────────────────────────────────────────────
export const sendUnauthorized = (
  res: Response,
  message: string = 'Unauthorized. Please login to continue.',
): Response => {
  return sendError(res, message, HTTP_STATUS.UNAUTHORIZED);
};

// ─── Send Forbidden ───────────────────────────────────────────────────────────
export const sendForbidden = (
  res: Response,
  message: string = 'You do not have permission to perform this action.',
): Response => {
  return sendError(res, message, HTTP_STATUS.FORBIDDEN);
};

// ─── Send Not Found ───────────────────────────────────────────────────────────
export const sendNotFound = (res: Response, resource: string = 'Resource'): Response => {
  return sendError(res, `${resource} not found.`, HTTP_STATUS.NOT_FOUND);
};

// ─── Send Conflict ────────────────────────────────────────────────────────────
export const sendConflict = (
  res: Response,
  message: string = 'Resource already exists.',
): Response => {
  return sendError(res, message, HTTP_STATUS.CONFLICT);
};

// ─── Send Validation Error ────────────────────────────────────────────────────
export const sendValidationError = (
  res: Response,
  errors: { field?: string; message: string }[],
  message: string = 'Validation failed. Please check your input.',
): Response => {
  return sendError(res, message, HTTP_STATUS.UNPROCESSABLE_ENTITY, errors);
};

// ─── Send Too Many Requests ───────────────────────────────────────────────────
export const sendTooManyRequests = (
  res: Response,
  message: string = 'Too many requests. Please try again later.',
): Response => {
  return sendError(res, message, HTTP_STATUS.TOO_MANY_REQUESTS);
};

// ─── Send Internal Server Error ───────────────────────────────────────────────
export const sendInternalError = (
  res: Response,
  message: string = 'Something went wrong. Please try again.',
): Response => {
  return sendError(res, message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
};
