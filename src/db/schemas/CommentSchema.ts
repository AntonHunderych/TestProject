import z from 'zod';

export const CommentSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  authorId: z.string().min(1),
  todoId: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type IComment = z.infer<typeof CommentSchema>;