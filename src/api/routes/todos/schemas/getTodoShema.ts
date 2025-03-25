import { z } from 'zod';
import { getCommentSchema } from '../comments/schemas/getCommentSchema';

export const TodoSchemaResp = z.object({
  id: z.string().uuid().min(1),
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  eliminatedDate: z.date().optional().nullable(),
  importance: z.number().int().optional().nullable(),
  comments: z.array(getCommentSchema).optional().nullable(),
});
