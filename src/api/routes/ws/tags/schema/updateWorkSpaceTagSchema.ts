import z from 'zod';

export const updateWorkSpaceTagSchema = z.object({
  value: z.string(),
});
