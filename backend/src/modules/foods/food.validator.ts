import { z } from 'zod';

const addonOptionSchema = z.object({
  name: z.string().min(1).max(50),
  nameAm: z.string().max(50).optional(),
  price: z.number().min(0),
  isDefault: z.boolean().optional().default(false),
});

const addonGroupSchema = z.object({
  name: z.string().min(1).max(100),
  nameAm: z.string().max(100).optional(),
  isRequired: z.boolean().default(false),
  minSelect: z.number().min(0).default(0),
  maxSelect: z.number().min(1).default(1),
  options: z.array(addonOptionSchema).min(1, 'At least one option is required'),
});

export const CreateFoodSchema = z.object({
  name: z.string({ required_error: 'Food name is required' }).min(2).max(100).trim(),
  nameAm: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  descriptionAm: z.string().max(500).optional(),
  price: z.number({ required_error: 'Price is required' }).min(0),
  discountedPrice: z.number().min(0).optional(),
  category: z.string({ required_error: 'Category is required' }).min(1),
  isAvailable: z.boolean().optional().default(true),
  isVegetarian: z.boolean().optional().default(false),
  isVegan: z.boolean().optional().default(false),
  isSpicy: z.boolean().optional().default(false),
  isGlutenFree: z.boolean().optional().default(false),
  calories: z.number().min(0).optional(),
  preparationTime: z.number().min(1).optional(),
  tags: z.array(z.string().max(30)).max(10).optional(),
  sortOrder: z.number().optional().default(0),
  addonGroups: z.array(addonGroupSchema).optional(),
});

export const UpdateFoodSchema = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  nameAm: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  descriptionAm: z.string().max(500).optional(),
  price: z.number().min(0).optional(),
  discountedPrice: z.number().min(0).optional(),
  category: z.string().min(1).optional(),
  isAvailable: z.boolean().optional(),
  isVegetarian: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  isSpicy: z.boolean().optional(),
  isGlutenFree: z.boolean().optional(),
  calories: z.number().min(0).optional(),
  preparationTime: z.number().min(1).optional(),
  tags: z.array(z.string().max(30)).max(10).optional(),
  sortOrder: z.number().optional(),
  addonGroups: z.array(addonGroupSchema).optional(),
});

export const ToggleFoodAvailabilitySchema = z.object({
  isAvailable: z.boolean({ required_error: 'isAvailable is required' }),
});

export type CreateFoodInput = z.infer<typeof CreateFoodSchema>;
export type UpdateFoodInput = z.infer<typeof UpdateFoodSchema>;
export type ToggleFoodAvailabilityInput = z.infer<typeof ToggleFoodAvailabilitySchema>;
