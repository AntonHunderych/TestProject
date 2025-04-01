import z from 'zod';

export const BasicTodoSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().nullish(),
  importance: z.number().nullish(),
  eliminatedDate: z.date().nullish(),
  status: z.string().nullish(),
  creatorId: z.string(),
});
