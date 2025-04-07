import z from 'zod';
import { WorkSpaceUserRoleSchema } from './WorkSpaceUserRoleSchema';
import { WorkSpaceRolePermissionsSchema } from './WorkSpaceRolePermissionsSchema';

export const WorkSpaceRoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  workSpaceId: z.string(),
  permissions: z.array(WorkSpaceRolePermissionsSchema).optional(),
  workSpaceUsers: z.array(WorkSpaceUserRoleSchema).optional(),
});

export type IWorkSpaceRole = z.infer<typeof WorkSpaceRoleSchema>;
