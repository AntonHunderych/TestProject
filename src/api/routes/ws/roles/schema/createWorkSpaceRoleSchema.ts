import z from 'zod';
import { PermissionsEnumSchema } from '../../../../../types/Enum/PermisionsEnum';

export const createWorkSpaceRoleSchema = z.object({
  name: z.string(),
  permissions: z.array(PermissionsEnumSchema),
});
