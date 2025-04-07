import z from 'zod';

export const addCommandTodoSchema = z.object({
  todoId: z.string(),
  command: z.string(),
});
