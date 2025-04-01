import { IUsersRepo } from '../../repos/users/users.repo';
import { HttpError } from '../../api/error/HttpError';
import { TagEntity } from '../../services/typeorm/entities/TagEntity';
import { IWorkSpace } from '../../types/entities/WorkSpaceSchema';
import { ITodo } from '../../types/entities/TodoSchema';

export interface GetUserByIdResp {
  id: string;
  username: string;
  email: string;
  todos: ITodo[];
  tags: TagEntity[];
  workSpaces: IWorkSpace[];
}

export default async function getUserById(rep: IUsersRepo, id: string): Promise<GetUserByIdResp> {
  try {
    const user = await rep.getUserById(id);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      todos: user.todos,
      tags: user.tags,
      workSpaces: user.wsUsers.map((workSpaceUser) => workSpaceUser.workSpace),
    };
  } catch (e) {
    throw new HttpError(400, 'User dont exist');
  }
}
