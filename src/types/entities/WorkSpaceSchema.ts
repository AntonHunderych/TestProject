import z from 'zod';

export const WorkSpaceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  creatorId: z.string().min(1),
});

export type IWorkSpace = z.infer<typeof WorkSpaceSchema>;
