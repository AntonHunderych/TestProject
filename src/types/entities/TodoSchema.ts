import z from 'zod';
import { BasicTodoSchema } from './BasicTodoSchema';
import { CommentSchema } from './CommentSchema';
import { CategorySchema } from './CategorySchema';
import { TodoTagSchema } from './TodoTagSchema';

export const TodoSchema: any = BasicTodoSchema.extend({
  comments: z.array(CommentSchema),
  tags: z.array(TodoTagSchema),
  category: CategorySchema,
});

export type Todo = z.infer<typeof TodoSchema>;
