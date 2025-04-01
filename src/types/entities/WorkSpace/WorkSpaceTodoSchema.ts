import z from 'zod';
import { BasicTodoSchema } from '../BasicTodoSchema';
import { WorkSpaceSchema } from './WorkSpaceSchema';
import { WorkSpaceUserSchema } from './WorkSpaceUserSchema';
import { WorkSpaceCommentSchema } from './WorkSpaceCommentSchema';
import { WorkSpaceTagSchema } from './WorkSpaceTagSchema';
import { WorkSpaceTodoCategorySchema } from './WorkSpaceTodoCategorySchema';
import { WorkSpaceCommandSchema } from './WorkSpaceCommandSchema';
import { WorkSpaceContributorSchema } from './WorkSpaceContributorSchema';

export const WorkSpaceTodoSchema: any = BasicTodoSchema.extend({
  workSpaceId: z.string(),
  workSpace: WorkSpaceSchema,
  creator: WorkSpaceUserSchema,
  categoryId: z.string(),
  contributors: z.array(WorkSpaceContributorSchema).nullish(),
  comments: z.array(WorkSpaceCommentSchema).nullish(),
  tags: z.array(WorkSpaceTagSchema).nullish(),
  category: WorkSpaceTodoCategorySchema.nullish(),
  command: WorkSpaceCommandSchema.nullish(),
});

export type WorkSpaceTodo1 = z.infer<typeof WorkSpaceTodoSchema>;
