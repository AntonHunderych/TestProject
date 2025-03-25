import z from 'zod';

export const valueRoleGetter = z.object({
  value: z.string().min(1),
});
