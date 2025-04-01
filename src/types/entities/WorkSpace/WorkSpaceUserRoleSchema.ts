import z from 'zod';
import { WorkSpaceRoleSchema } from './WorkSpaceRolesSchema';
import { WorkSpaceUserSchema } from './WorkSpaceUserSchema';

export const WorkSpaceUserRoleSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
  user: z.nullable(WorkSpaceUserSchema).optional(),
  role: z.nullable(WorkSpaceRoleSchema).optional(),
});
