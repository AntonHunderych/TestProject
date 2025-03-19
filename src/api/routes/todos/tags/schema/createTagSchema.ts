import z from 'zod';

export const createTagSchema = z.object({
  value: z.string(),
})