import multer from 'multer';
import type { Request, Response, NextFunction } from 'express';
import { FILE_UPLOAD, ERROR_MESSAGES } from '@yene/shared';
import { BadRequestError } from '../errors/AppError';
import {
  uploadAvatar,
  uploadRestaurantLogo,
  uploadRestaurantCover,
  uploadFoodImage,
  uploadReviewImage,
  uploadCategoryImage,
} from '../../config/cloudinary';
import { logError } from '../../config/logger';

// ─── Multer Memory Storage ────────────────────────────────────────────────────
// Store files in memory buffer before uploading to Cloudinary
const storage = multer.memoryStorage();

// ─── File Filter ──────────────────────────────────────────────────────────────
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback,
): void => {
  if (
    FILE_UPLOAD.ALLOWED_IMAGE_TYPES.includes(
      file.mimetype as 'image/jpeg' | 'image/png' | 'image/webp',
    )
  ) {
    callback(null, true);
  } else {
    callback(
      new BadRequestError(
        `Invalid file type. Only ${FILE_UPLOAD.ALLOWED_IMAGE_TYPES.join(', ')} are allowed.`,
      ),
    );
  }
};

// ─── Multer Upload Instance ───────────────────────────────────────────────────
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: FILE_UPLOAD.MAX_SIZE_BYTES,
    files: FILE_UPLOAD.MAX_IMAGES_PER_FOOD,
  },
});

// ─── Single File Upload Middleware ────────────────────────────────────────────
export const uploadSingle = (fieldName: string) => upload.single(fieldName);

// ─── Multiple Files Upload Middleware ─────────────────────────────────────────
export const uploadMultiple = (fieldName: string, maxCount: number) =>
  upload.array(fieldName, maxCount);

// ─── Upload Avatar to Cloudinary ─────────────────────────────────────────────
export const processAvatarUpload = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      next();
      return;
    }

    if (!req.user) {
      throw new BadRequestError('User not authenticated.');
    }

    const result = await uploadAvatar(req.file.buffer, req.user.userId);
    req.uploadedFile = {
      publicId: result.publicId,
      url: result.url,
      secureUrl: result.secureUrl,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };

    next();
  } catch (error) {
    logError('Avatar upload failed', error);
    next(error);
  }
};

// ─── Upload Restaurant Logo to Cloudinary ─────────────────────────────────────
export const processRestaurantLogoUpload = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      next();
      return;
    }

    const restaurantId = req.params['restaurantId'] ?? req.user?.userId ?? 'temp';
    const result = await uploadRestaurantLogo(req.file.buffer, restaurantId);

    req.uploadedFile = {
      publicId: result.publicId,
      url: result.url,
      secureUrl: result.secureUrl,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };

    next();
  } catch (error) {
    logError('Restaurant logo upload failed', error);
    next(error);
  }
};

// ─── Upload Restaurant Cover to Cloudinary ────────────────────────────────────
export const processRestaurantCoverUpload = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      next();
      return;
    }

    const restaurantId = req.params['restaurantId'] ?? req.user?.userId ?? 'temp';
    const result = await uploadRestaurantCover(req.file.buffer, restaurantId);

    req.uploadedFile = {
      publicId: result.publicId,
      url: result.url,
      secureUrl: result.secureUrl,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };

    next();
  } catch (error) {
    logError('Restaurant cover upload failed', error);
    next(error);
  }
};

// ─── Upload Food Image to Cloudinary ──────────────────────────────────────────
export const processFoodImageUpload = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      next();
      return;
    }

    const foodId = req.params['foodId'] ?? 'temp';
    const result = await uploadFoodImage(req.file.buffer, foodId);

    req.uploadedFile = {
      publicId: result.publicId,
      url: result.url,
      secureUrl: result.secureUrl,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };

    next();
  } catch (error) {
    logError('Food image upload failed', error);
    next(error);
  }
};

// ─── Upload Multiple Food Images to Cloudinary ────────────────────────────────
export const processMultipleFoodImagesUpload = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      next();
      return;
    }

    const foodId = req.params['foodId'] ?? 'temp';
    const uploadPromises = req.files.map((file, index) =>
      uploadFoodImage(file.buffer, foodId, index),
    );

    const results = await Promise.all(uploadPromises);

    req.uploadedFiles = results.map((result, index) => ({
      fieldname: `image_${index}`,
      publicId: result.publicId,
      url: result.url,
      secureUrl: result.secureUrl,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    }));

    next();
  } catch (error) {
    logError('Multiple food images upload failed', error);
    next(error);
  }
};

// ─── Upload Review Images to Cloudinary ───────────────────────────────────────
export const processReviewImagesUpload = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      next();
      return;
    }

    const reviewId = req.params['reviewId'] ?? 'temp';
    const uploadPromises = req.files.map((file, index) =>
      uploadReviewImage(file.buffer, reviewId, index),
    );

    const results = await Promise.all(uploadPromises);

    req.uploadedFiles = results.map((result, index) => ({
      fieldname: `image_${index}`,
      publicId: result.publicId,
      url: result.url,
      secureUrl: result.secureUrl,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    }));

    next();
  } catch (error) {
    logError('Review images upload failed', error);
    next(error);
  }
};

// ─── Upload Category Image to Cloudinary ──────────────────────────────────────
export const processCategoryImageUpload = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      next();
      return;
    }

    const categoryId = req.params['categoryId'] ?? 'temp';
    const result = await uploadCategoryImage(req.file.buffer, categoryId);

    req.uploadedFile = {
      publicId: result.publicId,
      url: result.url,
      secureUrl: result.secureUrl,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };

    next();
  } catch (error) {
    logError('Category image upload failed', error);
    next(error);
  }
};

// ─── Handle Multer Errors ─────────────────────────────────────────────────────
export const handleMulterError = (
  error: unknown,
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      next(new BadRequestError(`File too large. Maximum size is ${FILE_UPLOAD.MAX_SIZE_MB}MB.`));
      return;
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      next(
        new BadRequestError(`Too many files. Maximum is ${FILE_UPLOAD.MAX_IMAGES_PER_FOOD} files.`),
      );
      return;
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      next(new BadRequestError(ERROR_MESSAGES.INVALID_FILE_TYPE));
      return;
    }
  }
  next(error);
};

export default upload;
