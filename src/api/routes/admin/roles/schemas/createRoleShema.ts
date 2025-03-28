import z from 'zod';

export const createRoleSchema = z.object({
  value: z.string().min(1),
  description: z.string().optional(),
});
