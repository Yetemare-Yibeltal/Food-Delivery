import type { Request, Response, NextFunction } from 'express';
import { foodService } from './food.service';
import {
  sendSuccess,
  sendCreated,
  sendNoContent,
  sendPaginated,
} from '../../shared/utils/response.utils';
import type { CreateFoodDTO, UpdateFoodDTO, FoodFilterDTO } from './food.dto';

// ─── Food Controller ──────────────────────────────────────────────────────────
export class FoodController {
  createFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ownerId = req.user!.userId;
      const { restaurantId } = req.params;
      const data = req.body as CreateFoodDTO;
      const food = await foodService.createFood(ownerId, restaurantId!, data);
      sendCreated(res, food, 'Food item created successfully');
    } catch (error) {
      next(error);
    }
  };

  getFoods = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = req.query as unknown as FoodFilterDTO;
      const result = await foodService.getFoods(filters);
      sendPaginated(res, result.foods, {
        page: result.page,
        limit: filters.limit ?? 20,
        total: result.total,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
      });
    } catch (error) {
      next(error);
    }
  };

  getFoodById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const food = await foodService.getFoodById(id!);
      sendSuccess(res, food, 'Food item retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getRestaurantMenu = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { restaurantId } = req.params;
      const includeUnavailable = req.query['includeUnavailable'] === 'true';
      const foods = await foodService.getRestaurantMenu(restaurantId!, includeUnavailable);
      sendSuccess(res, foods, 'Restaurant menu retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  updateFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const ownerId = req.user!.userId;
      const userRole = req.user!.role;
      const data = req.body as UpdateFoodDTO;
      const food = await foodService.updateFood(id!, ownerId, userRole, data);
      sendSuccess(res, food, 'Food item updated successfully');
    } catch (error) {
      next(error);
    }
  };

  uploadFoodImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const ownerId = req.user!.userId;
      if (!req.file) {
        res.status(400).json({ success: false, message: 'Image file is required' });
        return;
      }
      const food = await foodService.uploadFoodImage(id!, ownerId, req.file);
      sendSuccess(res, food, 'Food image uploaded successfully');
    } catch (error) {
      next(error);
    }
  };

  toggleAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const ownerId = req.user!.userId;
      const { isAvailable } = req.body as { isAvailable: boolean };
      const food = await foodService.toggleAvailability(id!, ownerId, isAvailable);
      sendSuccess(res, food, `Food item is now ${isAvailable ? 'available' : 'unavailable'}`);
    } catch (error) {
      next(error);
    }
  };

  deleteFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const ownerId = req.user!.userId;
      const userRole = req.user!.role;
      await foodService.deleteFood(id!, ownerId, userRole);
      sendNoContent(res);
    } catch (error) {
      next(error);
    }
  };
}

export const foodController = new FoodController();
export default foodController;
