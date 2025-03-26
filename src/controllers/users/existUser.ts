import { IUsersRepo } from '../../repos/users/users.repo';
import { User } from '../../types/entities/UserSchema';

export async function existUser(userRepo: IUsersRepo, email: string): Promise<User | null> {
  return await userRepo.getUserByEmail(email);
}
