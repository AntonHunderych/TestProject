import z from 'zod';
import { WorkSpaceTodoTagSchema } from './WorkSpaceTodoTagSchema';

export const WorkSpaceTagSchema = z.object({
  todos: z.array(WorkSpaceTodoTagSchema),
  creatorId: z.string(),
  workSpaceId: z.string(),
});
export type WorkSpaceTag = z.infer<typeof WorkSpaceTagSchema>;
