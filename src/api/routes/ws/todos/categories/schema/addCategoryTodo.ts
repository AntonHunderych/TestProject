import z from 'zod';

export const addCategoryTodo = z.object({
  categoryId: z.string(),
  todoId: z.string(),
});
