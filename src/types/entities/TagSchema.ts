import z from 'zod';
import { BasicTagSchema } from './BasicTagSchema';
import { TodoTagSchema } from './TodoTagSchema';

export const TagSchema: any = BasicTagSchema.extend({
  todos: z.array(TodoTagSchema).nullish(),
  userId: z.string(),
});

export type Tag = z.infer<typeof TagSchema>;
