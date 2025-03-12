import { createCommentSchema } from './createCommentSchema';

export const updateCommentSchema = createCommentSchema.omit({ todoId: true });
