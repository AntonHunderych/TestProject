import z from 'zod';
import { WorkSpaceTodoSchema } from './WorkSpaceTodoSchema';
import { WorkSpaceTagSchema } from './WorkSpaceTagSchema';
import { WorkSpaceCommentSchema } from './WorkSpaceCommentSchema';
import { WorkSpaceTodoTagSchema } from './WorkSpaceTodoTagSchema';
import { WorkSpaceContributorSchema } from './WorkSpaceContributorSchema';
import { WorkSpaceUserRoleSchema } from './WorkSpaceUserRoleSchema';
import { WorkSpaceUserCommandSchema } from './WorkSpaceUserCommandSchema';

export const WorkSpaceUserSchema = z.object({
  id: z.string(),
  userId: z.string(),
  workSpaceId: z.string(),
  createdTodos: z.array(WorkSpaceTodoSchema).optional(),
  contributedTodos: z.array(WorkSpaceContributorSchema).optional(),
  comments: z.array(WorkSpaceCommentSchema).optional(),
  roles: z.array(WorkSpaceUserRoleSchema).optional(),
  assignedTags: z.array(WorkSpaceTodoTagSchema).optional(),
  createdTags: z.array(WorkSpaceTagSchema).optional(),
  commands: z.array(WorkSpaceUserCommandSchema).optional(),
});

export type WorkSpaceUser = z.infer<typeof WorkSpaceUserSchema>;
