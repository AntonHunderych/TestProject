import z from 'zod';
import { getWorkSpaceRoleSchema } from '../../roles/schema/getWorkSpaceRoleSchema';
import { getWorkSpaceTodoSchema } from '../../todos/schema/getWorkSpaceTodoSchema';

export const getWorkSpaceUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  roles: z.array(getWorkSpaceRoleSchema),
  todos: z.array(getWorkSpaceTodoSchema)
})
