import z from 'zod';
import { createRespUserSchema } from './createRespUserSchema';

export const getUsersRespSchema = z.object({
  data: z.array(createRespUserSchema),
  count: z.number(),
});
