import z from 'zod';

export const createWorkSpaceRespSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
});
