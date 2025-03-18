import z from 'zod';

export const getWorkSpaceRoleSchema = z.object({
  id: z.string(),
  name: z.string(),
});
