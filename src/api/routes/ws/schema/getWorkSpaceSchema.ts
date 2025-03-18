import z from 'zod';

export const getWorkSpaceSchema = z.object({
  name: z.string(),
  description: z.string(),
});
