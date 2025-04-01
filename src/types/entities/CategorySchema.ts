import z from 'zod';
import { BasicCategorySchema } from './BasicCategorySchema';
import { TodoSchema } from './TodoSchema';

export const CategorySchema: any = BasicCategorySchema.extend({
  todos: z.array(TodoSchema),
  userId: z.string().uuid(),
});

export type Category = z.infer<typeof CategorySchema>;
