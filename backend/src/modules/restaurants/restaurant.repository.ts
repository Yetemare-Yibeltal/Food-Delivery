import type { FilterQuery, UpdateQuery } from 'mongoose';
import { RestaurantModel, type IRestaurantDocument } from './restaurant.schema';
import { DatabaseError } from '../../shared/errors/AppError';
import { logError } from '../../config/logger';
import type { RestaurantFilterDTO } from './restaurant.dto';

// ─── Restaurant Repository ────────────────────────────────────────────────────
export class RestaurantRepository {
  // ─── Find by ID ───────────────────────────────────────────────────────────
  async findById(id: string): Promise<IRestaurantDocument | null> {
    try {
      return await RestaurantModel.findOne({
        _id: id,
        deletedAt: { $exists: false },
      }).populate('owner', 'firstName lastName email phone avatar');
    } catch (error) {
      logError('RestaurantRepository.findById', error);
      throw new DatabaseError('Failed to find restaurant');
    }
  }

  // ─── Find by Slug ──────────────────────────────────────────────────────────
  async findBySlug(slug: string): Promise<IRestaurantDocument | null> {
    try {
      return await RestaurantModel.findOne({
        slug,
        deletedAt: { $exists: false },
      }).populate('owner', 'firstName lastName email phone avatar');
    } catch (error) {
      logError('RestaurantRepository.findBySlug', error);
      throw new DatabaseError('Failed to find restaurant');
    }
  }

  // ─── Find by Owner ─────────────────────────────────────────────────────────
  async findByOwner(ownerId: string): Promise<IRestaurantDocument | null> {
    try {
      return await RestaurantModel.findOne({
        owner: ownerId,
        deletedAt: { $exists: false },
      });
    } catch (error) {
      logError('RestaurantRepository.findByOwner', error);
      throw new DatabaseError('Failed to find restaurant by owner');
    }
  }

  // ─── Find Many with Filters ────────────────────────────────────────────────
  async findMany(
    filters: RestaurantFilterDTO,
  ): Promise<{ restaurants: IRestaurantDocument[]; total: number }> {
    try {
      const {
        city,
        cuisineType,
        isOpen,
        isFeatured,
        priceRange,
        minRating,
        search,
        lat,
        lng,
        radius = 10,
        page = 1,
        limit = 12,
        sortBy = 'rating',
        sortOrder = 'desc',
      } = filters;

      const query: FilterQuery<IRestaurantDocument> = {
        isVerified: true,
        isActive: true,
        status: 'active',
        deletedAt: { $exists: false },
      };

      if (city) query['location.city'] = city;
      if (cuisineType) query.cuisineTypes = { $in: [cuisineType] };
      if (isOpen !== undefined) query.isOpen = isOpen;
      if (isFeatured !== undefined) query.isFeatured = isFeatured;
      if (priceRange) query.priceRange = priceRange;
      if (minRating) query['rating.average'] = { $gte: minRating };

      if (search) {
        query.$text = { $search: search };
      }

      // Geolocation query
      if (lat !== undefined && lng !== undefined) {
        query['location.coordinates'] = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
            $maxDistance: radius * 1000,
          },
        };
      }

      const sortOptions: Record<string, Record<string, 1 | -1>> = {
        rating: { 'rating.average': -1 },
        deliveryTime: { 'deliverySettings.estimatedDeliveryTime': 1 },
        deliveryFee: { 'deliverySettings.deliveryFee': 1 },
        newest: { createdAt: -1 },
        distance: {},
      };

      const sort = sortOptions[sortBy] ?? { 'rating.average': -1 };
      const skip = (page - 1) * limit;

      const [restaurants, total] = await Promise.all([
        RestaurantModel.find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .populate('owner', 'firstName lastName email phone avatar')
          .lean(false),
        RestaurantModel.countDocuments(query),
      ]);

      return { restaurants, total };
    } catch (error) {
      logError('RestaurantRepository.findMany', error);
      throw new DatabaseError('Failed to find restaurants');
    }
  }

  // ─── Find Featured ─────────────────────────────────────────────────────────
  async findFeatured(
    city?: string,
    limit = 6,
  ): Promise<IRestaurantDocument[]> {
    try {
      const query: FilterQuery<IRestaurantDocument> = {
        isVerified: true,
        isActive: true,
        isFeatured: true,
        status: 'active',
        deletedAt: { $exists: false },
      };

      if (city) query['location.city'] = city;

      return await RestaurantModel.find(query)
        .sort({ 'rating.average': -1 })
        .limit(limit)
        .populate('owner', 'firstName lastName');
    } catch (error) {
      logError('RestaurantRepository.findFeatured', error);
      throw new DatabaseError('Failed to find featured restaurants');
    }
  }

  // ─── Find Nearby ───────────────────────────────────────────────────────────
  async findNearby(
    lat: number,
    lng: number,
    radius = 5,
    limit = 10,
  ): Promise<IRestaurantDocument[]> {
    try {
      return await RestaurantModel.find({
        isVerified: true,
        isActive: true,
        status: 'active',
        deletedAt: { $exists: false },
        'location.coordinates': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
            $maxDistance: radius * 1000,
          },
        },
      })
        .limit(limit)
        .populate('owner', 'firstName lastName');
    } catch (error) {
      logError('RestaurantRepository.findNearby', error);
      throw new DatabaseError('Failed to find nearby restaurants');
    }
  }

  // ─── Create ────────────────────────────────────────────────────────────────
  async create(
    data: Partial<IRestaurantDocument>,
  ): Promise<IRestaurantDocument> {
    try {
      const restaurant = new RestaurantModel(data);
      return await restaurant.save();
    } catch (error) {
      logError('RestaurantRepository.create', error);
      throw new DatabaseError('Failed to create restaurant');
    }
  }

  // ─── Update ────────────────────────────────────────────────────────────────
  async update(
    id: string,
    data: UpdateQuery<IRestaurantDocument>,
  ): Promise<IRestaurantDocument | null> {
    try {
      return await RestaurantModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      }).populate('owner', 'firstName lastName email phone');
    } catch (error) {
      logError('RestaurantRepository.update', error);
      throw new DatabaseError('Failed to update restaurant');
    }
  }

  // ─── Toggle Open Status ────────────────────────────────────────────────────
  async toggleOpenStatus(
    id: string,
    isOpen: boolean,
  ): Promise<IRestaurantDocument | null> {
    try {
      return await RestaurantModel.findByIdAndUpdate(
        id,
        { $set: { isOpen } },
        { new: true },
      );
    } catch (error) {
      logError('RestaurantRepository.toggleOpenStatus', error);
      throw new DatabaseError('Failed to toggle restaurant status');
    }
  }

  // ─── Verify Restaurant ─────────────────────────────────────────────────────
  async verify(
    id: string,
    verifiedBy: string,
  ): Promise<IRestaurantDocument | null> {
    try {
      return await RestaurantModel.findByIdAndUpdate(
        id,
        {
          $set: {
            isVerified: true,
            status: 'active',
            verifiedAt: new Date(),
            verifiedBy,
            rejectionReason: undefined,
          },
        },
        { new: true },
      );
    } catch (error) {
      logError('RestaurantRepository.verify', error);
      throw new DatabaseError('Failed to verify restaurant');
    }
  }

  // ─── Reject Restaurant ─────────────────────────────────────────────────────
  async reject(
    id: string,
    reason: string,
  ): Promise<IRestaurantDocument | null> {
    try {
      return await RestaurantModel.findByIdAndUpdate(
        id,
        {
          $set: {
            status: 'rejected',
            rejectionReason: reason,
            isVerified: false,
          },
        },
        { new: true },
      );
    } catch (error) {
      logError('RestaurantRepository.reject', error);
      throw new DatabaseError('Failed to reject restaurant');
    }
  }

  // ─── Suspend Restaurant ────────────────────────────────────────────────────
  async suspend(
    id: string,
    reason: string,
    suspendedBy: string,
  ): Promise<IRestaurantDocument | null> {
    try {
      return await RestaurantModel.findByIdAndUpdate(
        id,
        {
          $set: {
            status: 'suspended',
            suspensionReason: reason,
            suspendedAt: new Date(),
            suspendedBy,
            isOpen: false,
          },
        },
        { new: true },
      );
    } catch (error) {
      logError('RestaurantRepository.suspend', error);
      throw new DatabaseError('Failed to suspend restaurant');
    }
  }

  // ─── Update Rating ─────────────────────────────────────────────────────────
  async updateRating(
    id: string,
    newRating: number,
  ): Promise<void> {
    try {
      const restaurant = await RestaurantModel.findById(id);
      if (!restaurant) return;

      const currentCount = restaurant.rating.count;
      const currentAverage = restaurant.rating.average;
      const newCount = currentCount + 1;
      const newAverage =
        (currentAverage * currentCount + newRating) / newCount;

      await RestaurantModel.findByIdAndUpdate(id, {
        $set: {
          'rating.average': Math.round(newAverage * 10) / 10,
          'rating.count': newCount,
        },
        $inc: {
          [`rating.distribution.${newRating}`]: 1,
        },
      });
    } catch (error) {
      logError('RestaurantRepository.updateRating', error);
      throw new DatabaseError('Failed to update restaurant rating');
    }
  }

  // ─── Increment Order Count ─────────────────────────────────────────────────
  async incrementOrderStats(
    id: string,
    orderTotal: number,
  ): Promise<void> {
    try {
      await RestaurantModel.findByIdAndUpdate(id, {
        $inc: {
          totalOrders: 1,
          totalRevenue: orderTotal,
        },
      });
    } catch (error) {
      logError('RestaurantRepository.incrementOrderStats', error);
      throw new DatabaseError('Failed to update restaurant order stats');
    }
  }

  // ─── Soft Delete ───────────────────────────────────────────────────────────
  async softDelete(id: string): Promise<void> {
    try {
      await RestaurantModel.findByIdAndUpdate(id, {
        $set: {
          deletedAt: new Date(),
          isActive: false,
          isOpen: false,
        },
      });
    } catch (error) {
      logError('RestaurantRepository.softDelete', error);
      throw new DatabaseError('Failed to delete restaurant');
    }
  }

  // ─── Count by Filter ───────────────────────────────────────────────────────
  async count(
    filter: FilterQuery<IRestaurantDocument> = {},
  ): Promise<number> {
    try {
      return await RestaurantModel.countDocuments({
        ...filter,
        deletedAt: { $exists: false },
      });
    } catch (error) {
      logError('RestaurantRepository.count', error);
      throw new DatabaseError('Failed to count restaurants');
    }
  }

  // ─── Find All for Admin ────────────────────────────────────────────────────
  async findAllForAdmin(options: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    city?: string;
  }): Promise<{ restaurants: IRestaurantDocument[]; total: number }> {
    try {
      const { page = 1, limit = 20, status, search, city } = options;
      const query: FilterQuery<IRestaurantDocument> = {
        deletedAt: { $exists: false },
      };

      if (status) query.status = status;
      if (city) query['location.city'] = city;
      if (search) query.$text = { $search: search };

      const skip = (page - 1) * limit;

      const [restaurants, total] = await Promise.all([
        RestaurantModel.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .populate('owner', 'firstName lastName email phone'),
        RestaurantModel.countDocuments(query),
      ]);

      return { restaurants, total };
    } catch (error) {
      logError('RestaurantRepository.findAllForAdmin', error);
      throw new DatabaseError('Failed to find restaurants for admin');
    }
  }
}

export const restaurantRepository = new RestaurantRepository();
export default restaurantRepository;