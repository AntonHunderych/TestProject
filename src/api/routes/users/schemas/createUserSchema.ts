import z from 'zod';

export const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const createRespUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
});
