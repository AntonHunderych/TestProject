import z from 'zod';

export const createCommentSchema = z.object({
  text: z.string().min(1),
  todoId: z.string().min(1),
});
