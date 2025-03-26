import { IUsersRepo } from '../../repos/users/users.repo';
import { HttpError } from '../../api/error/HttpError';
import { User } from '../../types/entities/UserSchema';

export default async function getUserById(rep: IUsersRepo, id: string): Promise<User> {
  try {
    return await rep.getUserById(id);
  } catch (e) {
    throw new HttpError(400, 'User dont exist');
  }
}
