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
  contributors: z.array(z.lazy(() => WorkSpaceContributorSchema)),
  comments: z.array(z.lazy(() => WorkSpaceCommentSchema)),
  tags: z.array(z.lazy(() => WorkSpaceTodoTagSchema)),
  category: WorkSpaceCategorySchema.nullish(),
  command: WorkSpaceCommandSchema.nullish(),
});

export type WorkSpaceTodo = z.infer<typeof WorkSpaceTodoSchema>;
