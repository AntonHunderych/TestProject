import z from 'zod';

export const updateWorkSpaceCategorySchema = z.object({
  categoryId: z.string(),
  value: z.string().optional(),
  description: z.string().optional(),
});
