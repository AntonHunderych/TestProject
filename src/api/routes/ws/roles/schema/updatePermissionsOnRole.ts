import z from 'zod';
import { PermissionsEnumSchema } from '../../../../../types/enum/PermisionsEnum';

export const updatePermissionsOnRole = z.object({
  roleId: z.string(),
  permissions: z.array(PermissionsEnumSchema),
});
