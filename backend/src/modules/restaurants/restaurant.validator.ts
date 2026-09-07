import { z } from 'zod';
import { CuisineType } from '@yene/shared';

// ─── Coordinates Validator ────────────────────────────────────────────────────
const coordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

// ─── Location Validator ───────────────────────────────────────────────────────
const locationSchema = z.object({
  address: z.string().min(5).max(200).trim(),
  city: z.string().min(1).max(100),
  subCity: z.string().max(100).optional(),
  woreda: z.string().max(100).optional(),
  coordinates: coordinatesSchema,
});

// ─── Working Hours Validator ──────────────────────────────────────────────────
const workingHoursSchema = z.object({
  open: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:MM'),
  close: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:MM'),
  isOpen: z.boolean(),
});

// ─── Create Restaurant Schema ─────────────────────────────────────────────────
export const CreateRestaurantSchema = z.object({
  name: z
    .string({ required_error: 'Restaurant name is required' })
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters')
    .trim(),
  nameAm: z.string().max(100).optional(),
  description: z.string().max(1000).optional(),
  descriptionAm: z.string().max(1000).optional(),
  cuisineTypes: z
    .array(z.nativeEnum(CuisineType, { errorMap: () => ({ message: 'Invalid cuisine type' }) }))
    .min(1, 'At least one cuisine type is required')
    .max(5, 'Maximum 5 cuisine types allowed'),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .regex(/^(\+251|0)[0-9]{9}$/, 'Invalid Ethiopian phone number'),
  email: z.string().email('Invalid email address').optional(),
  website: z.string().url('Invalid website URL').optional(),
  location: locationSchema,
  priceRange: z
    .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
    .optional()
    .default(2),
  tags: z.array(z.string().max(30)).max(10).optional(),
});

// ─── Update Restaurant Schema ─────────────────────────────────────────────────
export const UpdateRestaurantSchema = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  nameAm: z.string().max(100).optional(),
  description: z.string().max(1000).optional(),
  descriptionAm: z.string().max(1000).optional(),
  cuisineTypes: z
    .array(z.nativeEnum(CuisineType, { errorMap: () => ({ message: 'Invalid cuisine type' }) }))
    .min(1)
    .max(5)
    .optional(),
  phone: z
    .string()
    .regex(/^(\+251|0)[0-9]{9}$/, 'Invalid Ethiopian phone number')
    .optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  location: locationSchema.optional(),
  priceRange: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
  tags: z.array(z.string().max(30)).max(10).optional(),
});

// ─── Update Working Hours Schema ──────────────────────────────────────────────
export const UpdateWorkingHoursSchema = z.object({
  monday: workingHoursSchema.optional(),
  tuesday: workingHoursSchema.optional(),
  wednesday: workingHoursSchema.optional(),
  thursday: workingHoursSchema.optional(),
  friday: workingHoursSchema.optional(),
  saturday: workingHoursSchema.optional(),
  sunday: workingHoursSchema.optional(),
});

// ─── Update Delivery Settings Schema ─────────────────────────────────────────
export const UpdateDeliverySettingsSchema = z.object({
  minimumOrder: z.number().min(0).max(10000).optional(),
  deliveryFee: z.number().min(0).max(1000).optional(),
  freeDeliveryAbove: z.number().min(0).optional(),
  estimatedDeliveryTime: z.number().min(5).max(180).optional(),
  maxDeliveryRadius: z.number().min(1).max(50).optional(),
  isDeliveryAvailable: z.boolean().optional(),
  isPickupAvailable: z.boolean().optional(),
});

// ─── Update Bank Account Schema ───────────────────────────────────────────────
export const UpdateBankAccountSchema = z.object({
  bankName: z.string().max(100).optional(),
  accountNumber: z.string().max(50).optional(),
  accountHolderName: z.string().max(100).optional(),
  telebirrNumber: z
    .string()
    .regex(/^(\+251|0)[0-9]{9}$/)
    .optional(),
  cbeBirrNumber: z
    .string()
    .regex(/^(\+251|0)[0-9]{9}$/)
    .optional(),
});

// ─── Toggle Status Schema ─────────────────────────────────────────────────────
export const ToggleStatusSchema = z.object({
  isOpen: z.boolean({ required_error: 'isOpen is required' }),
});

// ─── Verify Restaurant Schema ─────────────────────────────────────────────────
export const VerifyRestaurantSchema = z
  .object({
    restaurantId: z.string({ required_error: 'Restaurant ID is required' }).min(1),
    action: z.enum(['approve', 'reject'], {
      errorMap: () => ({ message: 'Action must be approve or reject' }),
    }),
    reason: z.string().max(500).optional(),
  })
  .refine((data) => data.action !== 'reject' || (data.reason && data.reason.length > 0), {
    message: 'Rejection reason is required',
    path: ['reason'],
  });

// ─── Restaurant Filter Schema ─────────────────────────────────────────────────
export const RestaurantFilterSchema = z.object({
  city: z.string().optional(),
  cuisineType: z.string().optional(),
  isOpen: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
  isFeatured: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
  priceRange: z.string().transform(Number).optional(),
  minRating: z.string().transform(Number).optional(),
  search: z.string().max(100).optional(),
  lat: z.string().transform(Number).optional(),
  lng: z.string().transform(Number).optional(),
  radius: z.string().transform(Number).optional(),
  page: z.string().transform(Number).optional().default('1'),
  limit: z.string().transform(Number).optional().default('12'),
  sortBy: z.enum(['rating', 'deliveryTime', 'deliveryFee', 'distance', 'newest']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────
export type CreateRestaurantInput = z.infer<typeof CreateRestaurantSchema>;
export type UpdateRestaurantInput = z.infer<typeof UpdateRestaurantSchema>;
export type UpdateWorkingHoursInput = z.infer<typeof UpdateWorkingHoursSchema>;
export type UpdateDeliverySettingsInput = z.infer<typeof UpdateDeliverySettingsSchema>;
export type UpdateBankAccountInput = z.infer<typeof UpdateBankAccountSchema>;
export type ToggleStatusInput = z.infer<typeof ToggleStatusSchema>;
export type VerifyRestaurantInput = z.infer<typeof VerifyRestaurantSchema>;
export type RestaurantFilterInput = z.infer<typeof RestaurantFilterSchema>;
