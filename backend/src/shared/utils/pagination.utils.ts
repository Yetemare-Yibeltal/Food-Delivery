import { PAGINATION } from '@yene/shared';

// ─── Pagination Options Interface ─────────────────────────────────────────────
export interface IPaginationOptions {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ─── Pagination Result Interface ──────────────────────────────────────────────
export interface IPaginationResult {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  sort: Record<string, 1 | -1>;
}

// ─── Pagination Meta Interface ────────────────────────────────────────────────
export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  from: number;
  to: number;
}

// ─── Parse Pagination Options ─────────────────────────────────────────────────
export const parsePagination = (
  options: IPaginationOptions,
  defaultSortBy: string = 'createdAt',
): IPaginationResult => {
  const page = Math.max(1, parseInt(String(options.page || PAGINATION.DEFAULT_PAGE), 10));

  const limit = Math.min(
    PAGINATION.MAX_LIMIT,
    Math.max(1, parseInt(String(options.limit || PAGINATION.DEFAULT_LIMIT), 10)),
  );

  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || defaultSortBy;
  const sortOrder = options.sortOrder === 'asc' ? 'asc' : 'desc';
  const sort: Record<string, 1 | -1> = {
    [sortBy]: sortOrder === 'asc' ? 1 : -1,
  };

  return { page, limit, skip, sortBy, sortOrder, sort };
};

// ─── Build Pagination Meta ────────────────────────────────────────────────────
export const buildPaginationMeta = (
  total: number,
  page: number,
  limit: number,
): IPaginationMeta => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage: hasPrevPage ? page - 1 : null,
    from,
    to,
  };
};

// ─── Build Paginated Response ─────────────────────────────────────────────────
export const buildPaginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): {
  data: T[];
  meta: IPaginationMeta;
} => {
  return {
    data,
    meta: buildPaginationMeta(total, page, limit),
  };
};

// ─── Parse Sort Options ───────────────────────────────────────────────────────
export const parseSort = (
  sortBy?: string,
  sortOrder?: string,
  allowedFields: string[] = ['createdAt', 'updatedAt'],
  defaultField: string = 'createdAt',
): Record<string, 1 | -1> => {
  const field = allowedFields.includes(sortBy || '') ? sortBy! : defaultField;
  const order: 1 | -1 = sortOrder === 'asc' ? 1 : -1;
  return { [field]: order };
};

// ─── Parse Date Range ─────────────────────────────────────────────────────────
export const parseDateRange = (
  startDate?: string | Date,
  endDate?: string | Date,
): { $gte?: Date; $lte?: Date } | undefined => {
  const filter: { $gte?: Date; $lte?: Date } = {};

  if (startDate) {
    filter.$gte = new Date(startDate);
  }

  if (endDate) {
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    filter.$lte = end;
  }

  return Object.keys(filter).length > 0 ? filter : undefined;
};

// ─── Build Search Query ───────────────────────────────────────────────────────
export const buildSearchQuery = (search: string, fields: string[]): Record<string, unknown> => {
  if (!search || search.trim() === '') return {};

  const searchRegex = new RegExp(search.trim(), 'i');
  return {
    $or: fields.map((field) => ({ [field]: searchRegex })),
  };
};

// ─── Sanitize Query String ────────────────────────────────────────────────────
export const sanitizeQueryString = (value: unknown): string => {
  if (typeof value === 'string') {
    return value.trim().replace(/[<>]/g, '');
  }
  return '';
};

// ─── Parse Boolean Query ──────────────────────────────────────────────────────
export const parseBoolean = (value: unknown): boolean | undefined => {
  if (value === 'true' || value === true) return true;
  if (value === 'false' || value === false) return false;
  return undefined;
};

// ─── Parse Number Query ───────────────────────────────────────────────────────
export const parseNumber = (value: unknown, defaultValue?: number): number | undefined => {
  const num = parseFloat(String(value));
  if (isNaN(num)) return defaultValue;
  return num;
};
