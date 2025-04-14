import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  eliminatedDate: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val),
    z
      .date()
      .refine((date) => date > new Date(), {
        message: 'Data must be in the future',
      })
      .optional(),
  ),
  importance: z.number().int().min(1).max(10).optional(),
});
