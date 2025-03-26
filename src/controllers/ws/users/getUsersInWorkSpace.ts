import { IWorkSpaceUserRepo } from '../../../repos/workspace/user/workSpaceUser.repo';
import { WorkSpaceTodo } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { WorkSpaceRoles } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceRolesEntity';

export interface IGetUsersInWorkSpaceHandler {
  id: string;
  username: string;
  todos: WorkSpaceTodo[];
  roles: WorkSpaceRoles[];
}

export async function getUsersInWorkSpaceHandler(
  workSpaceUserRepo: IWorkSpaceUserRepo,
  workSpaceId: string,
): Promise<IGetUsersInWorkSpaceHandler[]> {
  const users = await workSpaceUserRepo.getUserInWorkSpace(workSpaceId);
  return users.map((workSpaceUser) => {
    return {
      id: workSpaceUser.user.id,
      username: workSpaceUser.user.username,
      todos: workSpaceUser.createdTodos,
      roles: workSpaceUser.roles,
    };
  });
}
