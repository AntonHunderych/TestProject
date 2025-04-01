import z from 'zod';

export const WorkSpaceTodoSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  importance: z.number().optional(),
  eliminatedDate: z.date().optional(),
  creatorId: z.string(),
});

export type WorkSpaceTodo1 = z.infer<typeof WorkSpaceTodoSchema>;
