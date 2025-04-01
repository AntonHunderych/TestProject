import z from 'zod';
import { WorkSpaceSchema } from './WorkSpaceSchema';
import { WorkSpaceUserRoleSchema } from './WorkSpaceUserRoleSchema';

export const WorkSpaceRoleSchema: any = z.object({
  id: z.string(),
  name: z.string(),
  workSpaceId: z.string(),
  workSpace: WorkSpaceSchema.nullish(),
  workSpaceUsers: z.array(WorkSpaceUserRoleSchema).nullish(),
});
