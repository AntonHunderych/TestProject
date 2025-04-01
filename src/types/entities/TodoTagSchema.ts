import z from 'zod';
import { TagSchema } from './TagSchema';
import { TodoSchema } from './TodoSchema';

export const TodoTagSchema = z.object({
  tagId: z.string(),
  todoId: z.string(),
  tag: z.optional(z.nullable(TagSchema)),
  todo: z.optional(z.nullable(TodoSchema)),
});
