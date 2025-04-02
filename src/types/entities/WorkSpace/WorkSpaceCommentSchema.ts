import z from 'zod';
import { BasicCommentSchema } from '../BasicCommentSchema';

export const WorkSpaceCommentSchema = BasicCommentSchema.extend({
  workSpaceId: z.string(),
});

export type WorkSpaceComment = z.infer<typeof WorkSpaceCommentSchema>;
