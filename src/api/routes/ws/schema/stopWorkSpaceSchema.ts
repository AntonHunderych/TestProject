import z from 'zod';

export const stopWorkSpaceSchema = z.object({
  casualToken: z.string(),
});
