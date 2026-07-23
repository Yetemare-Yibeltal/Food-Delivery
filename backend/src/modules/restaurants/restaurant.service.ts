import { restaurantRepository } from './restaurant.repository';
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  ConflictError,
} from '../../shared/errors/AppError';
import { logInfo, logError } from '../../config/logger';
import {
  uploadRestaurantLogo,
  uploadRestaurantCover,
  deleteImage,
} from '../../config/cloudinary';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, UserRole } from '@yene/shared';
import type { IRestaurantDocument } from './restaurant.schema';
import type {
  CreateRestaurantDTO,
  UpdateRestaurantDTO,
  UpdateWorkingHoursDTO,
  UpdateDeliverySettingsDTO,
  UpdateBankAccountDTO,
  RestaurantFilterDTO,
  VerifyRestaurantDTO,
} from './restaurant.dto';

// ─── Restaurant Service ───────────────────────────────────────────────────────
export class RestaurantService {
  // ─── Create Restaurant ─────────────────────────────────────────────────────
  async createRestaurant(
    ownerId: string,
    data: CreateRestaurantDTO,
  ): Promise<IRestaurantDocument> {
    // Check if owner already has a restaurant
    const existing = await restaurantRepository.findByOwner(ownerId);
    if (existing) {
      throw new ConflictError(
        'You already have a registered restaurant. Contact support to add more.',
      );
    }

    const restaurant = await restaurantRepository.create({
      ...data,
      owner: ownerId as unknown as import('mongoose').Types.ObjectId,
      location: {
        address: data.location.address,
        city: data.location.city,
        subCity: data.location.subCity,
        woreda: data.location.woreda,
        coordinates: {
          type: 'Point',
          coordinates: [data.location.coordinates.lng, data.location.coordinates.lat],
        },
      },
    });

    logInfo('Restaurant created', { restaurantId: restaurant._id, ownerId });

    return restaurant;
  }

  // ─── Get Restaurant by ID ──────────────────────────────────────────────────
  async getRestaurantById(id: string): Promise<IRestaurantDocument> {
    const restaurant = await restaurantRepository.findById(id);
    if (!restaurant) {
      throw new NotFoundError('Restaurant');
    }
    return restaurant;
  }

  // ─── Get Restaurant by Slug ────────────────────────────────────────────────
  async getRestaurantBySlug(slug: string): Promise<IRestaurantDocument> {
    const restaurant = await restaurantRepository.findBySlug(slug);
    if (!restaurant) {
      throw new NotFoundError('Restaurant');
    }
    return restaurant;
  }

  // ─── Get My Restaurant ─────────────────────────────────────────────────────
  async getMyRestaurant(ownerId: string): Promise<IRestaurantDocument> {
    const restaurant = await restaurantRepository.findByOwner(ownerId);
    if (!restaurant) {
      throw new NotFoundError('Restaurant');
    }
    return restaurant;
  }

  // ─── Get Restaurants with Filters ─────────────────────────────────────────
  async getRestaurants(filters: RestaurantFilterDTO): Promise<{
    restaurants: IRestaurantDocument[];
    total: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }> {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 12;

    const { restaurants, total } =
      await restaurantRepository.findMany(filters);

    const totalPages = Math.ceil(total / limit);

    return {
      restaurants,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }

  // ─── Get Featured Restaurants ──────────────────────────────────────────────
  async getFeaturedRestaurants(
    city?: string,
    limit = 6,
  ): Promise<IRestaurantDocument[]> {
    return restaurantRepository.findFeatured(city, limit);
  }

  // ─── Get Nearby Restaurants ────────────────────────────────────────────────
  async getNearbyRestaurants(
    lat: number,
    lng: number,
    radius = 5,
    limit = 10,
  ): Promise<IRestaurantDocument[]> {
    return restaurantRepository.findNearby(lat, lng, radius, limit);
  }

  // ─── Update Restaurant ─────────────────────────────────────────────────────
  async updateRestaurant(
    restaurantId: string,
    ownerId: string,
    userRole: string,
    data: UpdateRestaurantDTO,
  ): Promise<IRestaurantDocument> {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      throw new NotFoundError('Restaurant');
    }

    // Only owner or admin can update
    if (
      restaurant.owner.toString() !== ownerId &&
      userRole !== UserRole.ADMIN
    ) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    const updateData: Record<string, unknown> = {};
    if (data.name) updateData.name = data.name;
    if (data.nameAm) updateData.nameAm = data.nameAm;
    if (data.description) updateData.description = data.description;
    if (data.descriptionAm) updateData.descriptionAm = data.descriptionAm;
    if (data.cuisineTypes) updateData.cuisineTypes = data.cuisineTypes;
    if (data.phone) updateData.phone = data.phone;
    if (data.email) updateData.email = data.email;
    if (data.website) updateData.website = data.website;
    if (data.priceRange) updateData.priceRange = data.priceRange;
    if (data.tags) updateData.tags = data.tags;

    if (data.location) {
      updateData.location = {
        address: data.location.address,
        city: data.location.city,
        subCity: data.location.subCity,
        woreda: data.location.woreda,
        coordinates: {
          type: 'Point',
          coordinates: [
            data.location.coordinates.lng,
            data.location.coordinates.lat,
          ],
        },
      };
    }

    const updated = await restaurantRepository.update(restaurantId, {
      $set: updateData,
    });

    if (!updated) throw new NotFoundError('Restaurant');

    logInfo('Restaurant updated', { restaurantId, ownerId });

    return updated;
  }

  // ─── Update Working Hours ──────────────────────────────────────────────────
  async updateWorkingHours(
    restaurantId: string,
    ownerId: string,
    data: UpdateWorkingHoursDTO,
  ): Promise<IRestaurantDocument> {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) throw new NotFoundError('Restaurant');

    if (restaurant.owner.toString() !== ownerId) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    const updateData: Record<string, unknown> = {};
    for (const [day, hours] of Object.entries(data)) {
      if (hours) {
        updateData[`workingHours.${day}`] = hours;
      }
    }

    const updated = await restaurantRepository.update(restaurantId, {
      $set: updateData,
    });

    if (!updated) throw new NotFoundError('Restaurant');

    return updated;
  }

  // ─── Update Delivery Settings ──────────────────────────────────────────────
  async updateDeliverySettings(
    restaurantId: string,
    ownerId: string,
    data: UpdateDeliverySettingsDTO,
  ): Promise<IRestaurantDocument> {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) throw new NotFoundError('Restaurant');

    if (restaurant.owner.toString() !== ownerId) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        updateData[`deliverySettings.${key}`] = value;
      }
    }

    const updated = await restaurantRepository.update(restaurantId, {
      $set: updateData,
    });

    if (!updated) throw new NotFoundError('Restaurant');

    return updated;
  }

  // ─── Update Bank Account ───────────────────────────────────────────────────
  async updateBankAccount(
    restaurantId: string,
    ownerId: string,
    data: UpdateBankAccountDTO,
  ): Promise<IRestaurantDocument> {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) throw new NotFoundError('Restaurant');

    if (restaurant.owner.toString() !== ownerId) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    const updated = await restaurantRepository.update(restaurantId, {
      $set: { bankAccount: data },
    });

    if (!updated) throw new NotFoundError('Restaurant');

    return updated;
  }

  // ─── Toggle Open Status ────────────────────────────────────────────────────
  async toggleOpenStatus(
    restaurantId: string,
    ownerId: string,
    isOpen: boolean,
  ): Promise<IRestaurantDocument> {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) throw new NotFoundError('Restaurant');

    if (restaurant.owner.toString() !== ownerId) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    if (!restaurant.isVerified) {
      throw new BadRequestError(
        'Restaurant must be verified before it can open.',
      );
    }

    const updated = await restaurantRepository.toggleOpenStatus(
      restaurantId,
      isOpen,
    );

    if (!updated) throw new NotFoundError('Restaurant');

    logInfo(`Restaurant ${isOpen ? 'opened' : 'closed'}`, { restaurantId });

    return updated;
  }

  // ─── Upload Logo ───────────────────────────────────────────────────────────
  async uploadLogo(
    restaurantId: string,
    ownerId: string,
    file: Express.Multer.File,
  ): Promise<IRestaurantDocument> {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) throw new NotFoundError('Restaurant');

    if (restaurant.owner.toString() !== ownerId) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    // Delete old logo
    if (restaurant.logoPublicId) {
      try {
        await deleteImage(restaurant.logoPublicId);
      } catch (e) {
        logError('Failed to delete old logo', e);
      }
    }

    // Upload new logo
    const result = await uploadRestaurantLogo(file.path, restaurantId);

    const updated = await restaurantRepository.update(restaurantId, {
      $set: {
        logo: result.secure_url,
        logoPublicId: result.public_id,
      },
    });

    if (!updated) throw new NotFoundError('Restaurant');

    return updated;
  }

  // ─── Upload Cover Image ────────────────────────────────────────────────────
  async uploadCover(
    restaurantId: string,
    ownerId: string,
    file: Express.Multer.File,
  ): Promise<IRestaurantDocument> {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) throw new NotFoundError('Restaurant');

    if (restaurant.owner.toString() !== ownerId) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    // Delete old cover
    if (restaurant.coverImagePublicId) {
      try {
        await deleteImage(restaurant.coverImagePublicId);
      } catch (e) {
        logError('Failed to delete old cover', e);
      }
    }

    // Upload new cover
    const result = await uploadRestaurantCover(file.path, restaurantId);

    const updated = await restaurantRepository.update(restaurantId, {
      $set: {
        coverImage: result.secure_url,
        coverImagePublicId: result.public_id,
      },
    });

    if (!updated) throw new NotFoundError('Restaurant');

    return updated;
  }

  // ─── Verify Restaurant (Admin) ─────────────────────────────────────────────
  async verifyRestaurant(
    adminId: string,
    data: VerifyRestaurantDTO,
  ): Promise<IRestaurantDocument> {
    const restaurant = await restaurantRepository.findById(
      data.restaurantId,
    );
    if (!restaurant) throw new NotFoundError('Restaurant');

    let updated: IRestaurantDocument | null;

    if (data.action === 'approve') {
      updated = await restaurantRepository.verify(
        data.restaurantId,
        adminId,
      );
      logInfo('Restaurant approved', {
        restaurantId: data.restaurantId,
        adminId,
      });
    } else {
      if (!data.reason) {
        throw new BadRequestError('Rejection reason is required.');
      }
      updated = await restaurantRepository.reject(
        data.restaurantId,
        data.reason,
      );
      logInfo('Restaurant rejected', {
        restaurantId: data.restaurantId,
        adminId,
        reason: data.reason,
      });
    }

    if (!updated) throw new NotFoundError('Restaurant');

    return updated;
  }

  // ─── Delete Restaurant ─────────────────────────────────────────────────────
  async deleteRestaurant(
    restaurantId: string,
    ownerId: string,
    userRole: string,
  ): Promise<void> {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) throw new NotFoundError('Restaurant');

    if (
      restaurant.owner.toString() !== ownerId &&
      userRole !== UserRole.ADMIN
    ) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    await restaurantRepository.softDelete(restaurantId);

    logInfo('Restaurant deleted', { restaurantId, ownerId });
  }

  // ─── Get Restaurant Dashboard Stats ────────────────────────────────────────
  async getDashboardStats(restaurantId: string): Promise<{
    totalOrders: number;
    totalRevenue: number;
    rating: { average: number; count: number };
    isOpen: boolean;
    status: string;
  }> {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) throw new NotFoundError('Restaurant');

    return {
      totalOrders: restaurant.totalOrders,
      totalRevenue: restaurant.totalRevenue,
      rating: {
        average: restaurant.rating.average,
        count: restaurant.rating.count,
      },
      isOpen: restaurant.isOpen,
      status: restaurant.status,
    };
  }
}

export const restaurantService = new RestaurantService();
export default restaurantService;