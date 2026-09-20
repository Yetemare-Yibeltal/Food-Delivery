import { Router } from 'express';
import { cartController } from './cart.controller';
import { protect } from '../../shared/middleware/auth.middleware';

const router = Router();

router.use(protect);

router.get('/', cartController.getCart);
router.post('/items', cartController.addItem);
router.patch('/items/:itemId', cartController.updateItem);
router.delete('/items/:itemId', cartController.removeItem);
router.delete('/', cartController.clearCart);
router.post('/promo', cartController.applyCoupon);
router.delete('/promo', cartController.removeCoupon);

export default router;
