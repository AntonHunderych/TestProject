import z from 'zod';
import { UserSchema } from '../UserSchema';
import { WorkSpaceSchema } from './WorkSpaceSchema';
import { WorkSpaceTodoSchema } from './WorkSpaceTodoSchema';
import { WorkSpaceTagSchema } from './WorkSpaceTagSchema';
import { WorkSpaceCommentSchema } from './WorkSpaceCommentSchema';
import { WorkSpaceTodoTagSchema } from './WorkSpaceTodoTagSchema';
import { WorkSpaceContributorSchema } from './WorkSpaceContributorSchema';
import { WorkSpaceUserRoleSchema } from './WorkSpaceUserRoleSchema';
import { WorkSpaceUserCommandSchema } from './WorkSpaceUserCommandSchema';

export const WorkSpaceUserSchema: any = z.object({
  userId: z.string(),
  workSpaceId: z.string(),
  user: UserSchema.nullish(),
  workSpace: WorkSpaceSchema.nullish(),
  createdTodos: z.array(WorkSpaceTodoSchema).nullish(),
  contributedTodos: z.array(WorkSpaceContributorSchema).nullish(),
  comments: z.array(WorkSpaceCommentSchema).nullish(),
  roles: z.array(WorkSpaceUserRoleSchema).nullish(),
  assignedTags: z.array(WorkSpaceTodoTagSchema).nullish(),
  createdTags: z.array(WorkSpaceTagSchema).nullish(),
  commands: z.array(WorkSpaceUserCommandSchema).nullish(),
});
