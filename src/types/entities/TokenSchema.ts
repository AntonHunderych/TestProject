import z from 'zod';

export const TokenSchema = z.object({
  id: z.string(),
  value: z.string(),
  userId: z.string(),
});

export type Token = z.infer<typeof TokenSchema>;
