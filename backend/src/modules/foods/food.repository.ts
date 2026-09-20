import type { FilterQuery, UpdateQuery } from 'mongoose';
import { FoodModel, type IFoodDocument } from './food.schema';
import { DatabaseError } from '../../shared/errors/AppError';
import { logError } from '../../config/logger';
import type { FoodFilterDTO } from './food.dto';

// ─── Food Repository ──────────────────────────────────────────────────────────
export class FoodRepository {
  // ─── Find by ID ───────────────────────────────────────────────────────────
  async findById(id: string): Promise<IFoodDocument | null> {
    try {
      return await FoodModel.findOne({
        _id: id,
        deletedAt: { $exists: false },
      })
        .populate('category', 'name nameAm')
        .populate('restaurant', 'name nameAm slug logo');
    } catch (error) {
      logError('FoodRepository.findById', error);
      throw new DatabaseError('Failed to find food item');
    }
  }

  // ─── Find Many ─────────────────────────────────────────────────────────────
  async findMany(filters: FoodFilterDTO): Promise<{ foods: IFoodDocument[]; total: number }> {
    try {
      const {
        restaurant,
        category,
        isAvailable,
        isPopular,
        isVegetarian,
        isVegan,
        isSpicy,
        minPrice,
        maxPrice,
        search,
        page = 1,
        limit = 20,
        sortBy = 'popular',
        sortOrder = 'desc',
      } = filters;

      const query: FilterQuery<IFoodDocument> = {
        deletedAt: { $exists: false },
      };

      if (restaurant) query.restaurant = restaurant;
      if (category) query.category = category;
      if (isAvailable !== undefined) query.isAvailable = isAvailable;
      if (isPopular !== undefined) query.isPopular = isPopular;
      if (isVegetarian !== undefined) query.isVegetarian = isVegetarian;
      if (isVegan !== undefined) query.isVegan = isVegan;
      if (isSpicy !== undefined) query.isSpicy = isSpicy;

      if (minPrice !== undefined || maxPrice !== undefined) {
        query.price = {};
        if (minPrice !== undefined) query.price.$gte = minPrice;
        if (maxPrice !== undefined) query.price.$lte = maxPrice;
      }

      if (search) query.$text = { $search: search };

      const sortOptions: Record<string, Record<string, 1 | -1>> = {
        price: { price: sortOrder === 'asc' ? 1 : -1 },
        popular: { totalOrders: -1, 'rating.average': -1 },
        rating: { 'rating.average': -1 },
        newest: { createdAt: -1 },
      };

      const sort = sortOptions[sortBy] ?? { sortOrder: 1 };
      const skip = (page - 1) * limit;

      const [foods, total] = await Promise.all([
        FoodModel.find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .populate('category', 'name nameAm'),
        FoodModel.countDocuments(query),
      ]);

      return { foods, total };
    } catch (error) {
      logError('FoodRepository.findMany', error);
      throw new DatabaseError('Failed to find food items');
    }
  }

  // ─── Find by Restaurant ────────────────────────────────────────────────────
  async findByRestaurant(
    restaurantId: string,
    includeUnavailable = false,
  ): Promise<IFoodDocument[]> {
    try {
      const query: FilterQuery<IFoodDocument> = {
        restaurant: restaurantId,
        deletedAt: { $exists: false },
      };

      if (!includeUnavailable) query.isAvailable = true;

      return await FoodModel.find(query)
        .sort({ sortOrder: 1, totalOrders: -1 })
        .populate('category', 'name nameAm sortOrder');
    } catch (error) {
      logError('FoodRepository.findByRestaurant', error);
      throw new DatabaseError('Failed to find food items for restaurant');
    }
  }

  // ─── Create ────────────────────────────────────────────────────────────────
  async create(data: Partial<IFoodDocument>): Promise<IFoodDocument> {
    try {
      const food = new FoodModel(data);
      return await food.save();
    } catch (error) {
      logError('FoodRepository.create', error);
      throw new DatabaseError('Failed to create food item');
    }
  }

  // ─── Update ────────────────────────────────────────────────────────────────
  async update(id: string, data: UpdateQuery<IFoodDocument>): Promise<IFoodDocument | null> {
    try {
      return await FoodModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      }).populate('category', 'name nameAm');
    } catch (error) {
      logError('FoodRepository.update', error);
      throw new DatabaseError('Failed to update food item');
    }
  }

  // ─── Toggle Availability ───────────────────────────────────────────────────
  async toggleAvailability(id: string, isAvailable: boolean): Promise<IFoodDocument | null> {
    try {
      return await FoodModel.findByIdAndUpdate(id, { $set: { isAvailable } }, { new: true });
    } catch (error) {
      logError('FoodRepository.toggleAvailability', error);
      throw new DatabaseError('Failed to toggle food availability');
    }
  }

  // ─── Soft Delete ───────────────────────────────────────────────────────────
  async softDelete(id: string): Promise<void> {
    try {
      await FoodModel.findByIdAndUpdate(id, {
        $set: { deletedAt: new Date(), isAvailable: false },
      });
    } catch (error) {
      logError('FoodRepository.softDelete', error);
      throw new DatabaseError('Failed to delete food item');
    }
  }

  // ─── Increment Order Count ─────────────────────────────────────────────────
  async incrementOrderCount(id: string): Promise<void> {
    try {
      await FoodModel.findByIdAndUpdate(id, {
        $inc: { totalOrders: 1 },
      });
    } catch (error) {
      logError('FoodRepository.incrementOrderCount', error);
      throw new DatabaseError('Failed to increment order count');
    }
  }

  // ─── Update Rating ─────────────────────────────────────────────────────────
  async updateRating(id: string, newRating: number): Promise<void> {
    try {
      const food = await FoodModel.findById(id);
      if (!food) return;

      const newCount = food.rating.count + 1;
      const newAverage = (food.rating.average * food.rating.count + newRating) / newCount;

      await FoodModel.findByIdAndUpdate(id, {
        $set: {
          'rating.average': Math.round(newAverage * 10) / 10,
          'rating.count': newCount,
        },
      });
    } catch (error) {
      logError('FoodRepository.updateRating', error);
      throw new DatabaseError('Failed to update food rating');
    }
  }

  // ─── Count ─────────────────────────────────────────────────────────────────
  async count(filter: FilterQuery<IFoodDocument> = {}): Promise<number> {
    try {
      return await FoodModel.countDocuments({
        ...filter,
        deletedAt: { $exists: false },
      });
    } catch (error) {
      logError('FoodRepository.count', error);
      throw new DatabaseError('Failed to count food items');
    }
  }
}

export const foodRepository = new FoodRepository();
export default foodRepository;
