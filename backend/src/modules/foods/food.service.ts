import { foodRepository } from './food.repository';
import { BadRequestError, NotFoundError, ForbiddenError } from '../../shared/errors/AppError';
import { logInfo, logError } from '../../config/logger';
import { uploadFoodImage, deleteImage } from '../../config/cloudinary';
import { ERROR_MESSAGES, UserRole } from '@yene/shared';
import { restaurantRepository } from '../restaurants/restaurant.repository';
import type { IFoodDocument } from './food.schema';
import type { CreateFoodDTO, UpdateFoodDTO, FoodFilterDTO } from './food.dto';

// ─── Food Service ─────────────────────────────────────────────────────────────
export class FoodService {
  // ─── Create Food ───────────────────────────────────────────────────────────
  async createFood(
    ownerId: string,
    restaurantId: string,
    data: CreateFoodDTO,
  ): Promise<IFoodDocument> {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) throw new NotFoundError('Restaurant');

    if (restaurant.owner.toString() !== ownerId) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    const food = await foodRepository.create({
      ...data,
      restaurant: restaurantId as unknown as import('mongoose').Types.ObjectId,
      category: data.category as unknown as import('mongoose').Types.ObjectId,
    });

    logInfo('Food item created', { foodId: food._id, restaurantId });

    return food;
  }

  // ─── Get Food by ID ────────────────────────────────────────────────────────
  async getFoodById(id: string): Promise<IFoodDocument> {
    const food = await foodRepository.findById(id);
    if (!food) throw new NotFoundError('Food item');
    return food;
  }

  // ─── Get Foods with Filters ────────────────────────────────────────────────
  async getFoods(filters: FoodFilterDTO): Promise<{
    foods: IFoodDocument[];
    total: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }> {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;
    const { foods, total } = await foodRepository.findMany(filters);
    const totalPages = Math.ceil(total / limit);

    return {
      foods,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }

  // ─── Get Restaurant Menu ───────────────────────────────────────────────────
  async getRestaurantMenu(
    restaurantId: string,
    includeUnavailable = false,
  ): Promise<IFoodDocument[]> {
    return foodRepository.findByRestaurant(restaurantId, includeUnavailable);
  }

  // ─── Update Food ───────────────────────────────────────────────────────────
  async updateFood(
    foodId: string,
    ownerId: string,
    userRole: string,
    data: UpdateFoodDTO,
  ): Promise<IFoodDocument> {
    const food = await foodRepository.findById(foodId);
    if (!food) throw new NotFoundError('Food item');

    const restaurant = await restaurantRepository.findById(food.restaurant.toString());
    if (!restaurant) throw new NotFoundError('Restaurant');

    if (restaurant.owner.toString() !== ownerId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    const updated = await foodRepository.update(foodId, { $set: data });
    if (!updated) throw new NotFoundError('Food item');

    logInfo('Food item updated', { foodId, ownerId });

    return updated;
  }

  // ─── Upload Food Image ─────────────────────────────────────────────────────
  async uploadFoodImage(
    foodId: string,
    ownerId: string,
    file: Express.Multer.File,
  ): Promise<IFoodDocument> {
    const food = await foodRepository.findById(foodId);
    if (!food) throw new NotFoundError('Food item');

    const restaurant = await restaurantRepository.findById(food.restaurant.toString());
    if (!restaurant) throw new NotFoundError('Restaurant');

    if (restaurant.owner.toString() !== ownerId) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    if (food.imagePublicId) {
      try {
        await deleteImage(food.imagePublicId);
      } catch (e) {
        logError('Failed to delete old food image', e);
      }
    }

    const result = await uploadFoodImage(file.path, foodId);

    const updated = await foodRepository.update(foodId, {
      $set: {
        image: result.secure_url,
        imagePublicId: result.public_id,
      },
    });

    if (!updated) throw new NotFoundError('Food item');

    return updated;
  }

  // ─── Toggle Availability ───────────────────────────────────────────────────
  async toggleAvailability(
    foodId: string,
    ownerId: string,
    isAvailable: boolean,
  ): Promise<IFoodDocument> {
    const food = await foodRepository.findById(foodId);
    if (!food) throw new NotFoundError('Food item');

    const restaurant = await restaurantRepository.findById(food.restaurant.toString());
    if (!restaurant) throw new NotFoundError('Restaurant');

    if (restaurant.owner.toString() !== ownerId) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    const updated = await foodRepository.toggleAvailability(foodId, isAvailable);
    if (!updated) throw new NotFoundError('Food item');

    logInfo(`Food item ${isAvailable ? 'enabled' : 'disabled'}`, { foodId });

    return updated;
  }

  // ─── Delete Food ───────────────────────────────────────────────────────────
  async deleteFood(foodId: string, ownerId: string, userRole: string): Promise<void> {
    const food = await foodRepository.findById(foodId);
    if (!food) throw new NotFoundError('Food item');

    const restaurant = await restaurantRepository.findById(food.restaurant.toString());
    if (!restaurant) throw new NotFoundError('Restaurant');

    if (restaurant.owner.toString() !== ownerId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    await foodRepository.softDelete(foodId);

    logInfo('Food item deleted', { foodId, ownerId });
  }
}

export const foodService = new FoodService();
export default foodService;
