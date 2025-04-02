import z from 'zod';
import { WorkSpaceRolePermissionsSchema } from './WorkSpaceRolePermissionsSchema';

export const WorkSpacePermissionsSchema = z.object({
  id: z.string(),
  value: z.string(),
  roles: z.array(WorkSpaceRolePermissionsSchema),
});
