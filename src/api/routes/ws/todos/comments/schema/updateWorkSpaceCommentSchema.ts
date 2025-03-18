import z from 'zod';

export const updateWorkSpaceCommentSchema = z.object({
  id: z.string(),
  comment: z.string(),
});
