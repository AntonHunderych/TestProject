import z from 'zod';

export const getRoleSchema = z.object({
  value: z.string().min(1),
  description: z.string().nullable(),
});
