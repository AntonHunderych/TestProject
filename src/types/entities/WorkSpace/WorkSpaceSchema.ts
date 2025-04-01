import z from 'zod';
import { WorkSpaceTodoSchema } from './WorkSpaceTodoSchema';
import { WorkSpaceUserSchema } from './WorkSpaceUserSchema';
import { WorkSpaceRoleSchema } from './WorkSpaceRolesSchema';
import { WorkSpaceTagSchema } from './WorkSpaceTagSchema';
import { WorkSpaceCommandSchema } from './WorkSpaceCommandSchema';

export const WorkSpaceSchema: any = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  creatorId: z.string(),
  todos: z.array(WorkSpaceTodoSchema).nullish(),
  users: z.array(WorkSpaceUserSchema).nullish(),
  roles: z.array(WorkSpaceRoleSchema).nullish(),
  tags: z.array(WorkSpaceTagSchema).nullish(),
  commands: z.array(WorkSpaceCommandSchema).nullish(),
});

export type WorkSpace = z.infer<typeof WorkSpaceSchema>;
