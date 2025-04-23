import { createTodoSchema } from '../../../todos/schemas/createTodoSchema';
import z from 'zod';

export const createWorkSpaceTodoSchema = createTodoSchema.extend({
  commandId: z.string().nullish(),
});
