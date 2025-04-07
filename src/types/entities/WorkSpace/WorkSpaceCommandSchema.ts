import z from 'zod';
import { WorkSpaceUserCommandSchema } from './WorkSpaceUserCommandSchema';

export const WorkSpaceCommandSchema = z.object({
  id: z.string(),
  workSpaceId: z.string(),
  value: z.string(),
  users: z.array(WorkSpaceUserCommandSchema).optional(),
});

export type IWorkSpaceCommand = z.infer<typeof WorkSpaceCommandSchema>;
