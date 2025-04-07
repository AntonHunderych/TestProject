import z from 'zod';

export const addDeleteRoleUserSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
});
