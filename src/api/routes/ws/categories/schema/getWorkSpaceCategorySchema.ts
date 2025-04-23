import z from 'zod';

export const getWorkSpaceCategorySchema = z.object({
  id: z.string(),
  value: z.string(),
  description: z.string().nullish(),
});
