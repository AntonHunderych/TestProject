import z from 'zod';

export const getCommentSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  todoId: z.string().min(1),
  authorId: z.string().min(1),
});
