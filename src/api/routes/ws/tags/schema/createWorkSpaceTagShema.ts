import { WorkSpaceTagSchema } from '../../../../../types/entities/WorkSpace/WorkSpaceTagSchema';

export const createWorkSpaceTagSchema = WorkSpaceTagSchema.omit({
  todos: true,
  workSpaceId: true,
  creatorId: true,
  id: true,
});
