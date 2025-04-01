import z from 'zod';
import { BasicCommentSchema } from './BasicCommentSchema';

export const CommentSchema = BasicCommentSchema;

export type Comment = z.infer<typeof CommentSchema>;
