import { CartModel, type ICartDocument } from './cart.schema';
import { DatabaseError } from '../../shared/errors/AppError';
import { logError } from '../../config/logger';

// ─── Cart Repository ──────────────────────────────────────────────────────────
export class CartRepository {
  async findByUser(userId: string): Promise<ICartDocument | null> {
    try {
      return await CartModel.findOne({ user: userId })
        .populate('restaurant', 'name nameAm logo deliverySettings')
        .populate('items.food', 'name nameAm price image isAvailable');
    } catch (error) {
      logError('CartRepository.findByUser', error);
      throw new DatabaseError('Failed to find cart');
    }
  }

  async upsert(userId: string, data: Partial<ICartDocument>): Promise<ICartDocument> {
    try {
      return await CartModel.findOneAndUpdate(
        { user: userId },
        { $set: data },
        { new: true, upsert: true, runValidators: true },
      )
        .populate('restaurant', 'name nameAm logo deliverySettings')
        .populate('items.food', 'name nameAm price image isAvailable');
    } catch (error) {
      logError('CartRepository.upsert', error);
      throw new DatabaseError('Failed to update cart');
    }
  }

  async clear(userId: string): Promise<void> {
    try {
      await CartModel.findOneAndUpdate(
        { user: userId },
        {
          $set: {
            items: [],
            restaurant: undefined,
            restaurantName: undefined,
            subtotal: 0,
            deliveryFee: 0,
            discount: 0,
            total: 0,
            appliedCoupon: undefined,
            couponDiscount: 0,
            notes: undefined,
          },
        },
      );
    } catch (error) {
      logError('CartRepository.clear', error);
      throw new DatabaseError('Failed to clear cart');
    }
  }

  async delete(userId: string): Promise<void> {
    try {
      await CartModel.findOneAndDelete({ user: userId });
    } catch (error) {
      logError('CartRepository.delete', error);
      throw new DatabaseError('Failed to delete cart');
    }
  }
}

export const cartRepository = new CartRepository();
export default cartRepository;
