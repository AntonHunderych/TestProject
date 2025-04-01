import z from 'zod';
import { WorkSpaceUserSchema } from './WorkSpaceUserSchema';
import { WorkSpaceTodoSchema } from './WorkSpaceTodoSchema';

export const WorkSpaceContributorSchema = z.object({
  userId: z.string(),
  todoId: z.string(),
  user: z.nullable(WorkSpaceUserSchema).optional(),
  todo: z.nullable(WorkSpaceTodoSchema).optional(),
});
