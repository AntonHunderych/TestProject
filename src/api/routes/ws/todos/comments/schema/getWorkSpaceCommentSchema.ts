import z from 'zod';

export const getWorkSpaceCommentSchema = z.object({
  id: z.string(),
  text: z.string(),
  authorId: z.string(),
  updatedAt: z.date(),
});
