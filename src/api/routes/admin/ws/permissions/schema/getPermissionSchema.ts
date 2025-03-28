import z from 'zod';

export const getPermissionSchema = z.object({
  value: z.string(),
});
