import z from 'zod';

export const createWorkSpaceCommentSchema = z.object({
  comment: z.string(),
  todoId: z.string(),
});
