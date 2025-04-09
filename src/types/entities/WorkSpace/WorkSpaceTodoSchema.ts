import z from 'zod';
import { BasicTodoSchema } from '../BasicTodoSchema';
import { WorkSpaceCommentSchema } from './WorkSpaceCommentSchema';
import { WorkSpaceCategorySchema } from './WorkSpaceCategorySchema';
import { WorkSpaceTodoTagSchema } from './WorkSpaceTodoTagSchema';
import { WorkSpaceContributorSchema } from './WorkSpaceContributorSchema';
import { WorkSpaceCommandSchema } from './WorkSpaceCommandSchema';

export const WorkSpaceTodoSchema = BasicTodoSchema.extend({
  workSpaceId: z.string(),
  categoryId: z.string().nullish(),
  commandId: z.string().nullish(),
  contributors: z.array(z.lazy(() => WorkSpaceContributorSchema)).optional(),
  comments: z.array(z.lazy(() => WorkSpaceCommentSchema)).optional(),
  tags: z.array(z.lazy(() => WorkSpaceTodoTagSchema)).optional(),
  category: WorkSpaceCategorySchema.nullish(),
  command: WorkSpaceCommandSchema.nullish(),
  notification: z.boolean(),
});

export type WorkSpaceTodo = z.infer<typeof WorkSpaceTodoSchema>;
