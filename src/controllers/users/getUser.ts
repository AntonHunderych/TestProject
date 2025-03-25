import { User } from '../../db/schemas/UserSchema';
import { IUsersRepos } from '../../repos/users/users.repo';
import { HttpError } from '../../api/error/HttpError';

export default async function getUserById(rep: IUsersRepos, id: string): Promise<User> {
  try {
    return await rep.getUserById(id);
  } catch (e) {
    throw new HttpError(400, 'User dont exist');
  }
}
