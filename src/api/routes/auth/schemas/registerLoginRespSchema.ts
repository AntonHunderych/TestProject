import z from 'zod';

export const registerLoginRespSchema = z.object({
  token: z.string(),
});
