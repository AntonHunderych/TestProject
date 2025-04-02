import { z } from 'zod';
import { WorkSpaceTagSchema } from './WorkSpaceTagSchema';
import { WorkSpaceTodoSchema } from './WorkSpaceTodoSchema';
import { WorkSpaceUserSchema } from './WorkSpaceUserSchema';

export const WorkSpaceTodoTagSchema: any = z.object({
  todoId: z.string(),
  tagId: z.string(),
  workSpaceTag: z.lazy(() => WorkSpaceTagSchema).optional(),
  workSpaceTodo: z.lazy(() => WorkSpaceTodoSchema).optional(),
  assignedBy: z.optional(WorkSpaceUserSchema).nullable(),
});

export type WorkSpaceTodoTag = z.infer<typeof WorkSpaceTodoTagSchema>;
