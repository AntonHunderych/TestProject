import z from 'zod';

export const BasicCategorySchema = z.object({
  id: z.string(),
  value: z.string(),
  description: z.string().nullable(),
});
