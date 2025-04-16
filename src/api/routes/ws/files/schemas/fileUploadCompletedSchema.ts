import z from 'zod';

export const fileUploadCompletedSchema = z.object({
  fileName: z.string(),
  success: z.boolean(),
});
