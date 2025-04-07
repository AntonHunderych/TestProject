import z from 'zod';
import { WorkSpaceTodoTagSchema } from './WorkSpaceTodoTagSchema';

export const WorkSpaceTagSchema = z.object({
  id: z.string(),
  todos: z.array(WorkSpaceTodoTagSchema).optional(),
  creatorId: z.string(),
  workSpaceId: z.string(),
  value: z.string(),
});
export type WorkSpaceTag = z.infer<typeof WorkSpaceTagSchema>;
