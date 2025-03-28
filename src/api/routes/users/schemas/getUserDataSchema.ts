import z from 'zod';
import { getTodoSchema } from '../../todos/schemas/getTodoShema';
import { getTagSchema } from '../../todos/tags/schema/getTagSchema';
import { getWorkSpaceSchema } from '../../ws/schema/getWorkSpaceSchema';

export const getUserDataSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  todos: z.array(getTodoSchema.omit({ creator: true, comments: true })),
  tags: z.array(getTagSchema),
  workSpaces: z.array(getWorkSpaceSchema),
});
