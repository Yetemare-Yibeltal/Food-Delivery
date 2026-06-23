import type { Request, Response, NextFunction } from 'express';
import { UserRole } from '@yene/shared';
import { ForbiddenError, UnauthorizedError } from '../errors/AppError';

// ─── Authorize Roles Middleware ───────────────────────────────────────────────
// Restricts access to specific roles only
export const authorize = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('Access denied. Please login to continue.');
      }

      if (!roles.includes(req.user.role)) {
        throw new ForbiddenError(
          `Access denied. This route is restricted to: ${roles.join(', ')}.`,
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// ─── Admin Only Middleware ────────────────────────────────────────────────────
export const adminOnly = authorize(UserRole.ADMIN);

// ─── Restaurant Owner Only Middleware ─────────────────────────────────────────
export const restaurantOwnerOnly = authorize(UserRole.RESTAURANT_OWNER);

// ─── Rider Only Middleware ────────────────────────────────────────────────────
export const riderOnly = authorize(UserRole.RIDER);

// ─── Customer Only Middleware ─────────────────────────────────────────────────
export const customerOnly = authorize(UserRole.CUSTOMER);

// ─── Admin or Restaurant Owner Middleware ────────────────────────────────────
export const adminOrRestaurantOwner = authorize(UserRole.ADMIN, UserRole.RESTAURANT_OWNER);

// ─── Admin or Rider Middleware ────────────────────────────────────────────────
export const adminOrRider = authorize(UserRole.ADMIN, UserRole.RIDER);

// ─── Any Authenticated User Middleware ───────────────────────────────────────
export const anyRole = authorize(
  UserRole.ADMIN,
  UserRole.CUSTOMER,
  UserRole.RESTAURANT_OWNER,
  UserRole.RIDER,
);

// ─── Resource Owner Middleware ────────────────────────────────────────────────
// Ensures user can only access their own resources unless they are admin
export const resourceOwner = (userIdField: string = 'userId') => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('Access denied. Please login to continue.');
      }

      // Admins can access any resource
      if (req.user.role === UserRole.ADMIN) {
        next();
        return;
      }

      // Check if the resource belongs to the authenticated user
      const resourceUserId =
        req.params[userIdField] ?? (req.body as Record<string, unknown>)[userIdField];

      if (!resourceUserId) {
        throw new ForbiddenError('Resource owner verification failed.');
      }

      if (req.user.userId !== String(resourceUserId)) {
        throw new ForbiddenError('Access denied. You can only access your own resources.');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// ─── Check Restaurant Ownership ───────────────────────────────────────────────
// Ensures restaurant owner can only manage their own restaurant
export const ownRestaurantOnly = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    if (!req.user) {
      throw new UnauthorizedError('Access denied. Please login to continue.');
    }

    // Admins can access any restaurant
    if (req.user.role === UserRole.ADMIN) {
      next();
      return;
    }

    // Restaurant owners can only access their own restaurant
    if (req.user.role !== UserRole.RESTAURANT_OWNER) {
      throw new ForbiddenError('Access denied. Only restaurant owners can perform this action.');
    }

    next();
  } catch (error) {
    next(error);
  }
};
