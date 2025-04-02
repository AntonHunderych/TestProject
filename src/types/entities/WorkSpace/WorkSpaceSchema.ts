import z from 'zod';
import { WorkSpaceTodoSchema } from './WorkSpaceTodoSchema';
import { WorkSpaceUserSchema } from './WorkSpaceUserSchema';
import { WorkSpaceRoleSchema } from './WorkSpaceRolesSchema';
import { WorkSpaceTagSchema } from './WorkSpaceTagSchema';
import { WorkSpaceCommandSchema } from './WorkSpaceCommandSchema';
import { WorkSpaceCategorySchema } from './WorkSpaceCategorySchema';

export const WorkSpaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  creatorId: z.string(),
  todos: z.array(WorkSpaceTodoSchema).optional(),
  users: z.array(WorkSpaceUserSchema).optional(),
  roles: z.array(WorkSpaceRoleSchema).optional(),
  tags: z.array(WorkSpaceTagSchema).optional(),
  commands: z.array(WorkSpaceCommandSchema).optional(),
  categories: z.array(WorkSpaceCategorySchema).optional(),
});

export type WorkSpace = z.infer<typeof WorkSpaceSchema>;
