import z from 'zod';

export const addDeleteContributorSchema = z.object({
  todoId: z.string(),
  userId: z.string(),
});
