import z from 'zod';

export const BasicTagSchema = z.object({
  id: z.string(),
  value: z.string(),
});
