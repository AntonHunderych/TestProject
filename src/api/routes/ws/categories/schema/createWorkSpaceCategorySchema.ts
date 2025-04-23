import z from 'zod';

export const createWorkSpaceCategorySchema = z.object({
  value: z.string(),
  description: z.string().optional(),
});
