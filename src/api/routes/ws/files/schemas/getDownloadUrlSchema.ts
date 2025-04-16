import z from 'zod';

export const getDownloadUrlSchema = z.object({
  fileName: z.string(),
});
