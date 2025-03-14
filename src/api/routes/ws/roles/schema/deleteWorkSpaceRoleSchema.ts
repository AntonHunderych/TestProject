import z from 'zod';

export const deleteWorkSpaceRoleSchema = z.object({
  name: z.string(),
})