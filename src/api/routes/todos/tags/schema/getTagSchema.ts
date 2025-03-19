import z from 'zod';

export const getTagSchema = z.object({
  id: z.string(),
  value: z.string(),
})