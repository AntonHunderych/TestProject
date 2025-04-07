import { IUserRepo } from '../../repos/users/users.repo';
import { User } from '../../types/entities/UserSchema';

export default async function getAllUsers(rep: IUserRepo): Promise<User[]> {
  try {
    return await rep.getAllUsers();
  } catch (e) {
    throw new Error('Error in getAllUsersHandler');
  }
}
