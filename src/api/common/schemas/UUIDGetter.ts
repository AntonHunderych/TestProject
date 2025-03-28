import z from 'zod';
export const UUIDGetter = z.object({
  id: z.string().min(1),
});
