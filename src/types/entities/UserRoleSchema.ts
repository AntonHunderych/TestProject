import z from 'zod';
import { UserSchema } from './UserSchema';
import { RoleSchema } from './RoleSchema';

export const UserRoleSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
  user: z.optional(UserSchema),
  role: z.optional(RoleSchema),
});
