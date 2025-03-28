import z from 'zod';

export const addRemoveRoleSchema = z.object({
  roleValue: z.string().min(1),
  userId: z.string().min(1),
});
