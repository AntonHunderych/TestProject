import { IUsersRepo } from '../../repos/users/users.repo';
import { User } from '../../types/entities/UserSchema';

export default async function updateUser(rep: IUsersRepo, id: string, data: Partial<User>): Promise<User> {
  try {
    return await rep.updateUser(id, data);
  } catch (e) {
    throw Error('Error in updateUserHandler');
  }
}
