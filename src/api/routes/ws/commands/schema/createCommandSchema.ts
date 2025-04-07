import z from 'zod';

export const createCommandSchema = z.object({
  value: z.string(),
});
