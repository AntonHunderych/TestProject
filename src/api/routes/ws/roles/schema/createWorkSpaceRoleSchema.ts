import z from 'zod';
import { PermissionsEnumSchema } from '../../../../../Types/Enum/PermisionsEnum';

export const createWorkSpaceRoleSchema = z.object({
  name: z.string(),
  permissions: z.array(PermissionsEnumSchema),
});
