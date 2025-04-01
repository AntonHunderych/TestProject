import z from 'zod';
import { WorkSpaceTagSchema } from './WorkSpaceTagSchema';
import { WorkSpaceTodoSchema } from './WorkSpaceTodoSchema';
import { WorkSpaceUserSchema } from './WorkSpaceUserSchema';

export const WorkSpaceTodoTagSchema = z.object({
  todoId: z.string(),
  tagId: z.string(),
  workSpaceTag: WorkSpaceTagSchema.nullish(),
  workSpaceTodo: WorkSpaceTodoSchema.nullish(),
  assignedBy: WorkSpaceUserSchema.nullish(),
});
