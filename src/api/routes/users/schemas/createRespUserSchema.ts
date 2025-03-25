import z from 'zod';

export const createRespUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
});
