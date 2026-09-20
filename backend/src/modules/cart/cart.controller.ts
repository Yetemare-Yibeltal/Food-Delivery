import type { Request, Response, NextFunction } from 'express';
import { cartService } from './cart.service';
import { sendSuccess, sendNoContent } from '../../shared/utils/response.utils';
import type { AddItemDTO, UpdateItemDTO, ApplyCouponDTO } from './cart.dto';

export class CartController {
  getCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const cart = await cartService.getCart(userId);
      sendSuccess(res, cart, 'Cart retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  addItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const data = req.body as AddItemDTO;
      const cart = await cartService.addItem(userId, data);
      sendSuccess(res, cart, 'Item added to cart');
    } catch (error) {
      next(error);
    }
  };

  updateItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const { itemId } = req.params;
      const data = req.body as UpdateItemDTO;
      const cart = await cartService.updateItem(userId, itemId!, data);
      sendSuccess(res, cart, 'Cart item updated');
    } catch (error) {
      next(error);
    }
  };

  removeItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const { itemId } = req.params;
      const cart = await cartService.removeItem(userId, itemId!);
      sendSuccess(res, cart, 'Item removed from cart');
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      await cartService.clearCart(userId);
      sendNoContent(res);
    } catch (error) {
      next(error);
    }
  };

  applyCoupon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const { code } = req.body as ApplyCouponDTO;
      const cart = await cartService.applyCoupon(userId, code);
      sendSuccess(res, cart, 'Coupon applied successfully');
    } catch (error) {
      next(error);
    }
  };

  removeCoupon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const cart = await cartService.removeCoupon(userId);
      sendSuccess(res, cart, 'Coupon removed');
    } catch (error) {
      next(error);
    }
  };
}

export const cartController = new CartController();
export default cartController;
