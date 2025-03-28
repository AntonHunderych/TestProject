import z from 'zod';

export const createPermissionSchema = z.object({
  value: z.string(),
});
