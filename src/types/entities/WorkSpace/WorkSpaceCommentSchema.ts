import z from 'zod';
import { WorkSpaceTodoSchema } from './WorkSpaceTodoSchema';
import { WorkSpaceUserSchema } from './WorkSpaceUserSchema';
import { BasicCommentSchema } from '../BasicCommentSchema';

export const WorkSpaceCommentSchema = BasicCommentSchema.extend({
  workSpaceId: z.string(),
  creator: WorkSpaceUserSchema.nullish(),
  todo: WorkSpaceTodoSchema.nullish(),
});
