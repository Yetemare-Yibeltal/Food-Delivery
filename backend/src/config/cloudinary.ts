import { v2 as cloudinary } from 'cloudinary';
import { env } from './env';
import { FILE_UPLOAD } from '@yene/shared';
import { logError, logInfo } from './logger';

// ─── Configure Cloudinary ─────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

// ─── Upload Options Interface ─────────────────────────────────────────────────
export interface IUploadOptions {
  folder: string;
  publicId?: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpg' | 'png' | 'webp' | 'auto';
  transformation?: object[];
}

// ─── Upload Result Interface ──────────────────────────────────────────────────
export interface IUploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  createdAt: string;
}

// ─── Upload File from Buffer ──────────────────────────────────────────────────
export const uploadFile = async (
  fileBuffer: Buffer,
  options: IUploadOptions,
): Promise<IUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadOptions: object = {
      folder: options.folder,
      public_id: options.publicId,
      resource_type: 'image',
      format: options.format || 'webp',
      quality: options.quality || 'auto',
      transformation: options.transformation || [
        {
          width: options.width || 800,
          height: options.height || 800,
          crop: 'limit',
          quality: 'auto',
          fetch_format: 'auto',
        },
      ],
      overwrite: true,
    };

    const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) {
        logError('Cloudinary upload failed', error);
        reject(new Error(`Upload failed: ${error.message}`));
        return;
      }

      if (!result) {
        reject(new Error('Upload failed: No result returned'));
        return;
      }

      logInfo('File uploaded to Cloudinary', {
        publicId: result.public_id,
        url: result.secure_url,
        bytes: result.bytes,
      });

      resolve({
        publicId: result.public_id,
        url: result.url,
        secureUrl: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        createdAt: result.created_at,
      });
    });

    uploadStream.end(fileBuffer);
  });
};

// ─── Upload Avatar ────────────────────────────────────────────────────────────
export const uploadAvatar = async (fileBuffer: Buffer, userId: string): Promise<IUploadResult> => {
  return uploadFile(fileBuffer, {
    folder: FILE_UPLOAD.CLOUDINARY_FOLDERS.AVATARS,
    publicId: `avatar_${userId}`,
    width: 400,
    height: 400,
    format: 'webp',
    transformation: [
      {
        width: 400,
        height: 400,
        crop: 'fill',
        gravity: 'face',
        quality: 'auto',
        fetch_format: 'auto',
      },
    ],
  });
};

// ─── Upload Restaurant Logo ───────────────────────────────────────────────────
export const uploadRestaurantLogo = async (
  fileBuffer: Buffer,
  restaurantId: string,
): Promise<IUploadResult> => {
  return uploadFile(fileBuffer, {
    folder: FILE_UPLOAD.CLOUDINARY_FOLDERS.RESTAURANTS,
    publicId: `logo_${restaurantId}`,
    width: 400,
    height: 400,
    format: 'webp',
    transformation: [
      {
        width: 400,
        height: 400,
        crop: 'fill',
        quality: 'auto',
        fetch_format: 'auto',
      },
    ],
  });
};

// ─── Upload Restaurant Cover Image ────────────────────────────────────────────
export const uploadRestaurantCover = async (
  fileBuffer: Buffer,
  restaurantId: string,
): Promise<IUploadResult> => {
  return uploadFile(fileBuffer, {
    folder: FILE_UPLOAD.CLOUDINARY_FOLDERS.RESTAURANTS,
    publicId: `cover_${restaurantId}`,
    width: 1200,
    height: 400,
    format: 'webp',
    transformation: [
      {
        width: 1200,
        height: 400,
        crop: 'fill',
        quality: 'auto',
        fetch_format: 'auto',
      },
    ],
  });
};

// ─── Upload Food Image ────────────────────────────────────────────────────────
export const uploadFoodImage = async (
  fileBuffer: Buffer,
  foodId: string,
  index: number = 0,
): Promise<IUploadResult> => {
  return uploadFile(fileBuffer, {
    folder: FILE_UPLOAD.CLOUDINARY_FOLDERS.FOODS,
    publicId: `food_${foodId}_${index}`,
    width: 800,
    height: 600,
    format: 'webp',
    transformation: [
      {
        width: 800,
        height: 600,
        crop: 'fill',
        quality: 'auto',
        fetch_format: 'auto',
      },
    ],
  });
};

// ─── Upload Review Image ──────────────────────────────────────────────────────
export const uploadReviewImage = async (
  fileBuffer: Buffer,
  reviewId: string,
  index: number = 0,
): Promise<IUploadResult> => {
  return uploadFile(fileBuffer, {
    folder: FILE_UPLOAD.CLOUDINARY_FOLDERS.REVIEWS,
    publicId: `review_${reviewId}_${index}`,
    width: 800,
    height: 600,
    format: 'webp',
    transformation: [
      {
        width: 800,
        height: 600,
        crop: 'limit',
        quality: 'auto',
        fetch_format: 'auto',
      },
    ],
  });
};

// ─── Upload Category Image ────────────────────────────────────────────────────
export const uploadCategoryImage = async (
  fileBuffer: Buffer,
  categoryId: string,
): Promise<IUploadResult> => {
  return uploadFile(fileBuffer, {
    folder: FILE_UPLOAD.CLOUDINARY_FOLDERS.CATEGORIES,
    publicId: `category_${categoryId}`,
    width: 400,
    height: 400,
    format: 'webp',
    transformation: [
      {
        width: 400,
        height: 400,
        crop: 'fill',
        quality: 'auto',
        fetch_format: 'auto',
      },
    ],
  });
};

// ─── Delete File ──────────────────────────────────────────────────────────────
export const deleteFile = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
    logInfo('File deleted from Cloudinary', { publicId });
  } catch (error) {
    logError('Failed to delete file from Cloudinary', error);
    throw new Error(`Delete failed: ${(error as Error).message}`);
  }
};

// ─── Delete Multiple Files ────────────────────────────────────────────────────
export const deleteFiles = async (publicIds: string[]): Promise<void> => {
  try {
    await cloudinary.api.delete_resources(publicIds);
    logInfo('Files deleted from Cloudinary', { count: publicIds.length });
  } catch (error) {
    logError('Failed to delete files from Cloudinary', error);
    throw new Error(`Delete failed: ${(error as Error).message}`);
  }
};

// ─── Get File URL ─────────────────────────────────────────────────────────────
export const getFileUrl = (
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
  },
): string => {
  return cloudinary.url(publicId, {
    secure: true,
    width: options?.width,
    height: options?.height,
    quality: options?.quality || 'auto',
    fetch_format: options?.format || 'auto',
  });
};

export default cloudinary;
