import { cartRepository } from './cart.repository';
import { foodRepository } from '../foods/food.repository';
import { restaurantRepository } from '../restaurants/restaurant.repository';
import { BadRequestError, NotFoundError } from '../../shared/errors/AppError';
import { logInfo } from '../../config/logger';
import type { ICartDocument } from './cart.schema';
import type { AddItemDTO, UpdateItemDTO } from './cart.dto';
import mongoose from 'mongoose';

// ─── Cart Service ─────────────────────────────────────────────────────────────
export class CartService {
  // ─── Get Cart ──────────────────────────────────────────────────────────────
  async getCart(userId: string): Promise<ICartDocument | null> {
    return cartRepository.findByUser(userId);
  }

  // ─── Add Item ──────────────────────────────────────────────────────────────
  async addItem(userId: string, data: AddItemDTO): Promise<ICartDocument> {
    const food = await foodRepository.findById(data.foodId);
    if (!food) throw new NotFoundError('Food item');

    if (!food.isAvailable) {
      throw new BadRequestError('This food item is currently unavailable.');
    }

    const restaurant = await restaurantRepository.findById(data.restaurantId);
    if (!restaurant) throw new NotFoundError('Restaurant');

    if (!restaurant.isOpen) {
      throw new BadRequestError('This restaurant is currently closed.');
    }

    const currentCart = await cartRepository.findByUser(userId);

    // If cart has items from different restaurant clear it
    if (currentCart?.restaurant && currentCart.restaurant.toString() !== data.restaurantId) {
      await cartRepository.clear(userId);
    }

    const addonPrice = data.addons?.reduce((sum, addon) => sum + addon.price, 0) ?? 0;
    const itemPrice = food.price + addonPrice;
    const itemTotal = itemPrice * data.quantity;

    const cart = await cartRepository.findByUser(userId);

    const existingItemIndex =
      cart?.items.findIndex((item) => {
        const cartItem = item as unknown as {
          food: mongoose.Types.ObjectId;
          addons?: Array<{ groupName: string; optionName: string; price: number }>;
        };
        return (
          cartItem.food.toString() === data.foodId &&
          JSON.stringify(cartItem.addons ?? []) === JSON.stringify(data.addons ?? [])
        );
      }) ?? -1;

    let newItems = cart?.items ?? [];

    if (existingItemIndex >= 0) {
      const existingItem = newItems[existingItemIndex] as unknown as {
        quantity: number;
        totalPrice: number;
      };
      const newQuantity = existingItem.quantity + data.quantity;
      const newTotal = itemPrice * newQuantity;

      newItems = newItems.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item.toObject(), quantity: newQuantity, totalPrice: newTotal };
        }
        return item.toObject();
      });
    } else {
      const newItem = {
        food: new mongoose.Types.ObjectId(data.foodId),
        name: food.name,
        nameAm: food.nameAm,
        price: itemPrice,
        quantity: data.quantity,
        image: food.image,
        addons: data.addons ?? [],
        specialInstructions: data.specialInstructions,
        totalPrice: itemTotal,
      };
      newItems = [...newItems.map((i) => i.toObject()), newItem];
    }

    const subtotal = newItems.reduce(
      (sum, item) => sum + (item as unknown as { totalPrice: number }).totalPrice,
      0,
    );

    const deliveryFee = restaurant.deliverySettings.deliveryFee;
    const freeDeliveryAbove = restaurant.deliverySettings.freeDeliveryAbove;
    const actualDeliveryFee = freeDeliveryAbove && subtotal >= freeDeliveryAbove ? 0 : deliveryFee;

    const updatedCart = await cartRepository.upsert(userId, {
      restaurant: new mongoose.Types.ObjectId(data.restaurantId),
      restaurantName: restaurant.name,
      items: newItems as unknown as ICartDocument['items'],
      subtotal,
      deliveryFee: actualDeliveryFee,
      discount: cart?.discount ?? 0,
      total: subtotal + actualDeliveryFee - (cart?.discount ?? 0),
    });

    logInfo('Item added to cart', { userId, foodId: data.foodId });

    return updatedCart;
  }

  // ─── Update Item Quantity ──────────────────────────────────────────────────
  async updateItem(userId: string, itemId: string, data: UpdateItemDTO): Promise<ICartDocument> {
    const cart = await cartRepository.findByUser(userId);
    if (!cart) throw new NotFoundError('Cart');

    const itemIndex = cart.items.findIndex((item) => item._id?.toString() === itemId);

    if (itemIndex < 0) throw new NotFoundError('Cart item');

    if (data.quantity <= 0) {
      return this.removeItem(userId, itemId);
    }

    const item = cart.items[itemIndex] as unknown as {
      price: number;
      totalPrice: number;
      quantity: number;
    };
    const pricePerUnit = item.price;
    const newTotal = pricePerUnit * data.quantity;

    const newItems = cart.items.map((i, index) => {
      const cartItem = i.toObject();
      if (index === itemIndex) {
        return { ...cartItem, quantity: data.quantity, totalPrice: newTotal };
      }
      return cartItem;
    });

    const subtotal = newItems.reduce(
      (sum, i) => sum + (i as unknown as { totalPrice: number }).totalPrice,
      0,
    );

    const restaurant = cart.restaurant
      ? await restaurantRepository.findById(cart.restaurant.toString())
      : null;

    const deliveryFee = restaurant?.deliverySettings.deliveryFee ?? 0;
    const freeDeliveryAbove = restaurant?.deliverySettings.freeDeliveryAbove;
    const actualDeliveryFee = freeDeliveryAbove && subtotal >= freeDeliveryAbove ? 0 : deliveryFee;

    return cartRepository.upsert(userId, {
      items: newItems as unknown as ICartDocument['items'],
      subtotal,
      deliveryFee: actualDeliveryFee,
      total: subtotal + actualDeliveryFee - (cart.discount ?? 0),
    });
  }

  // ─── Remove Item ───────────────────────────────────────────────────────────
  async removeItem(userId: string, itemId: string): Promise<ICartDocument> {
    const cart = await cartRepository.findByUser(userId);
    if (!cart) throw new NotFoundError('Cart');

    const newItems = cart.items
      .filter((item) => item._id?.toString() !== itemId)
      .map((i) => i.toObject());

    const subtotal = newItems.reduce(
      (sum, i) => sum + (i as unknown as { totalPrice: number }).totalPrice,
      0,
    );

    const restaurant =
      newItems.length > 0 && cart.restaurant
        ? await restaurantRepository.findById(cart.restaurant.toString())
        : null;

    const deliveryFee = restaurant?.deliverySettings.deliveryFee ?? 0;
    const freeDeliveryAbove = restaurant?.deliverySettings.freeDeliveryAbove;
    const actualDeliveryFee = freeDeliveryAbove && subtotal >= freeDeliveryAbove ? 0 : deliveryFee;

    return cartRepository.upsert(userId, {
      items: newItems as unknown as ICartDocument['items'],
      restaurant: newItems.length === 0 ? undefined : cart.restaurant,
      restaurantName: newItems.length === 0 ? undefined : cart.restaurantName,
      subtotal,
      deliveryFee: newItems.length === 0 ? 0 : actualDeliveryFee,
      discount: newItems.length === 0 ? 0 : cart.discount,
      total: newItems.length === 0 ? 0 : subtotal + actualDeliveryFee - (cart.discount ?? 0),
      appliedCoupon: newItems.length === 0 ? undefined : cart.appliedCoupon,
      couponDiscount: newItems.length === 0 ? 0 : cart.couponDiscount,
    });
  }

  // ─── Clear Cart ────────────────────────────────────────────────────────────
  async clearCart(userId: string): Promise<void> {
    await cartRepository.clear(userId);
    logInfo('Cart cleared', { userId });
  }

  // ─── Apply Coupon ──────────────────────────────────────────────────────────
  async applyCoupon(userId: string, code: string): Promise<ICartDocument> {
    const cart = await cartRepository.findByUser(userId);
    if (!cart) throw new NotFoundError('Cart');
    if (cart.items.length === 0) {
      throw new BadRequestError('Cart is empty');
    }

    // TODO: implement full coupon validation in Phase 12
    // For now apply a simple 10% discount for demo
    const discount = cart.subtotal * 0.1;
    const total = cart.subtotal + cart.deliveryFee - discount;

    return cartRepository.upsert(userId, {
      appliedCoupon: code.toUpperCase(),
      couponDiscount: discount,
      discount,
      total,
    });
  }

  // ─── Remove Coupon ─────────────────────────────────────────────────────────
  async removeCoupon(userId: string): Promise<ICartDocument> {
    const cart = await cartRepository.findByUser(userId);
    if (!cart) throw new NotFoundError('Cart');

    const total = cart.subtotal + cart.deliveryFee;

    return cartRepository.upsert(userId, {
      appliedCoupon: undefined,
      couponDiscount: 0,
      discount: 0,
      total,
    });
  }
}

export const cartService = new CartService();
export default cartService;
