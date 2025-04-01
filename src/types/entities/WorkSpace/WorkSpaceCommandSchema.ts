import z from 'zod';
import { WorkSpaceTodoSchema } from './WorkSpaceTodoSchema';
import { WorkSpaceSchema } from './WorkSpaceSchema';
import { WorkSpaceUserCommandSchema } from './WorkSpaceUserCommandSchema';

export const WorkSpaceCommandSchema: any = z.object({
  workSpaceId: z.string(),
  value: z.string(),
  users: z.array(WorkSpaceUserCommandSchema).nullish(),
  todos: z.array(WorkSpaceTodoSchema).nullish(),
  workSpace: WorkSpaceSchema.nullish(),
});
