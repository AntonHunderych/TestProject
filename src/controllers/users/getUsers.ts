import { IUsersRepos } from '../../repos/users/users.repo';
import { User } from '../../db/schemas/UserSchema';

export default async function getAllUsers(rep: IUsersRepos): Promise<User[]> {
  try {
    return await rep.getAllUsers();
  } catch (e) {
    throw new Error('Error in getAllUsersHandler');
  }
}
