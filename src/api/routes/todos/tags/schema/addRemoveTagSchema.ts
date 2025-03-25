import z from 'zod';

export const addRemoveTagSchema = z.object({
  todoId: z.string(),
  tagId: z.string(),
});
