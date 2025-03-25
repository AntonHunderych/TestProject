import { IUsersRepos } from '../../repos/users/users.repo';
import { User } from '../../db/schemas/UserSchema';

export default async function updateUser(rep: IUsersRepos, id: string, data: Partial<User>): Promise<User> {
  try {
    return await rep.updateUser(id, data);
  } catch (e) {
    throw Error('Error in updateUserHandler');
  }
}
