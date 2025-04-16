import z from 'zod';

export const deleteFileSchema = z.object({
  fileName: z.string(),
});
