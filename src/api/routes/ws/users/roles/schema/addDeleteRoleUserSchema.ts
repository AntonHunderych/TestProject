import z from 'zod';

export const addDeleteRoleUserSchema = z.object({
  userId: z.string(),
  roleValue: z.string(),
});
