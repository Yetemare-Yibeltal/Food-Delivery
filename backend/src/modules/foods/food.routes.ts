import { Router } from 'express';
import { foodController } from './food.controller';
import { protect } from '../../shared/middleware/auth.middleware';
import { authorize } from '../../shared/middleware/rbac.middleware';
import { uploadMiddleware } from '../../shared/middleware/upload.middleware';
import { generalLimiter } from '../../shared/middleware/rateLimiter';
import { UserRole } from '@yene/shared';

const router = Router();

// ─── Public Routes ────────────────────────────────────────────────────────────
router.get('/', generalLimiter, foodController.getFoods);
router.get('/:id', generalLimiter, foodController.getFoodById);
router.get('/restaurant/:restaurantId/menu', generalLimiter, foodController.getRestaurantMenu);

// ─── Restaurant Owner Routes ──────────────────────────────────────────────────
router.post(
  '/restaurant/:restaurantId',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  foodController.createFood,
);

router.put(
  '/:id',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  foodController.updateFood,
);

router.post(
  '/:id/image',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  uploadMiddleware.single('image'),
  foodController.uploadFoodImage,
);

router.patch(
  '/:id/availability',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  foodController.toggleAvailability,
);

router.delete(
  '/:id',
  protect,
  authorize(UserRole.RESTAURANT_OWNER, UserRole.ADMIN),
  foodController.deleteFood,
);

export default router;
