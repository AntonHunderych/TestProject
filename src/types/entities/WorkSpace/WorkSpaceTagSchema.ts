import z from 'zod';
import { WorkSpaceUserSchema } from './WorkSpaceUserSchema';
import { WorkSpaceSchema } from './WorkSpaceSchema';
import { WorkSpaceTodoTagSchema } from './WorkSpaceTodoTagSchema';

export const WorkSpaceTagSchema: any = z.object({
  todos: z.array(WorkSpaceTodoTagSchema).nullish(),
  creatorId: z.string(),
  creator: WorkSpaceUserSchema.nullish(),
  workSpaceId: z.string(),
  workSpace: WorkSpaceSchema.nullish(),
});
