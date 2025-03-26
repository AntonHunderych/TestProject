import { z } from 'zod';
import { getCommentSchema } from '../comments/schemas/getCommentSchema';
import { getTagSchema } from '../tags/schema/getTagSchema';
import { createRespUserSchema } from '../../users/schemas/createRespUserSchema';

export const TodoSchemaResp = z.object({
  id: z.string().uuid().min(1),
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  eliminatedDate: z.date().optional().nullable(),
  importance: z.number().int().optional().nullable(),
  comments: z.array(getCommentSchema).optional().nullable(),
  creator: createRespUserSchema.optional().nullable(),
  tags: z
    .array(z.object({ todoId: z.string(), tagId: z.string(), tag: getTagSchema }))
    .optional()
    .nullable(),
});
