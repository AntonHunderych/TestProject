import z from 'zod';
import { WorkSpaceUserRoleSchema } from './WorkSpaceUserRoleSchema';

export const WorkSpaceRoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  workSpaceId: z.string(),
  workSpaceUsers: z.array(WorkSpaceUserRoleSchema).optional(),
});
