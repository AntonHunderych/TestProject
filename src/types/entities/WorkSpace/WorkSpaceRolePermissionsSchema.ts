import z from 'zod';
import { WorkSpaceRoleSchema } from './WorkSpaceRolesSchema';
import { WorkSpacePermissionsSchema } from './WorkSpacePermissionsSchema';

export const WorkSpaceRolePermissionsSchema: any = z.object({
  roleId: z.string(),
  value: z.string(),
  role: z.nullable(WorkSpaceRoleSchema).optional(),
  permission: z.number(WorkSpacePermissionsSchema).optional(),
});

export type WorkSpaceRolePermissions = z.infer<typeof WorkSpaceRolePermissionsSchema>;
