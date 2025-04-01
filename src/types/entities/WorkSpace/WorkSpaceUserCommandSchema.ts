import z from 'zod';
import { WorkSpaceUserSchema } from './WorkSpaceUserSchema';
import { WorkSpaceCommandSchema } from './WorkSpaceCommandSchema';

export const WorkSpaceUserCommandSchema = z.object({
  userId: z.string(),
  commandId: z.string(),
  user: WorkSpaceUserSchema.nullish(),
  command: WorkSpaceCommandSchema.nullish(),
});
