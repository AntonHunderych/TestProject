import z from 'zod';
export const UUIDGetter = z.object({
  id: z.string().uuid({ message: 'Invalid UUID format' }),
});
