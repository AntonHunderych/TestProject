import z from 'zod';

export const startWorkSpaceSchema = z.object({
  workSpaceAccessToken: z.string(),
});
