import z from 'zod';
import { WorkSpaceUserCommandSchema } from './WorkSpaceUserCommandSchema';

export const WorkSpaceCommandSchema = z.object({
  workSpaceId: z.string(),
  value: z.string(),
  users: z.array(WorkSpaceUserCommandSchema),
});
