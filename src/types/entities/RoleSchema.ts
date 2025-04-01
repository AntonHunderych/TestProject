import z from 'zod';

export const RoleSchema = z.object({
  id: z.string(),
  value: z.string(),
  description: z.string().nullish(),
});

export type Role = z.infer<typeof RoleSchema>;
