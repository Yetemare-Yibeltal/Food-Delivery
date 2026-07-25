import { Router } from 'express';
import { restaurantController } from './restaurant.controller';
import { protect } from '../../shared/middleware/auth.middleware';
import { authorize } from '../../shared/middleware/rbac.middleware';
import { uploadMiddleware } from '../../shared/middleware/upload.middleware';
import { generalLimiter } from '../../shared/middleware/rateLimiter';
import { UserRole } from '@yene/shared';

// ─── Restaurant Router ────────────────────────────────────────────────────────
const router = Router();

// ─── Public Routes ────────────────────────────────────────────────────────────
router.get(
  '/',
  generalLimiter,
  restaurantController.getRestaurants,
);

router.get(
  '/featured',
  generalLimiter,
  restaurantController.getFeaturedRestaurants,
);

router.get(
  '/nearby',
  generalLimiter,
  restaurantController.getNearbyRestaurants,
);

router.get(
  '/slug/:slug',
  generalLimiter,
  restaurantController.getRestaurantBySlug,
);

router.get(
  '/:id',
  generalLimiter,
  restaurantController.getRestaurantById,
);

router.get(
  '/:id/dashboard',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  restaurantController.getDashboardStats,
);

// ─── Restaurant Owner Routes ──────────────────────────────────────────────────
router.post(
  '/',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  restaurantController.createRestaurant,
);

router.get(
  '/owner/my',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  restaurantController.getMyRestaurant,
);

router.put(
  '/:id',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  restaurantController.updateRestaurant,
);

router.patch(
  '/:id/hours',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  restaurantController.updateWorkingHours,
);

router.patch(
  '/:id/delivery-settings',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  restaurantController.updateDeliverySettings,
);

router.patch(
  '/:id/bank-account',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  restaurantController.updateBankAccount,
);

router.patch(
  '/:id/status',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  restaurantController.toggleOpenStatus,
);

router.post(
  '/:id/logo',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  uploadMiddleware.single('logo'),
  restaurantController.uploadLogo,
);

router.post(
  '/:id/cover',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  uploadMiddleware.single('cover'),
  restaurantController.uploadCover,
);

router.delete(
  '/:id',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  restaurantController.deleteRestaurant,
);

// ─── Admin Routes ─────────────────────────────────────────────────────────────
router.post(
  '/admin/verify',
  protect,
  authorize(UserRole.ADMIN),
  restaurantController.verifyRestaurant,
);

export default router;