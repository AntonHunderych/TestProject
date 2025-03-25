import { IUsersRepos } from '../../repos/users/users.repo';
import { IUserRoleRepo } from '../../repos/userRole/userRole.repo';
import { withTransaction } from '../../db/withTransaction';
import { User } from '../../db/schemas/UserSchema';
import { giveDefaultRoleToUser } from '../userRole/giveDefaultRoleToUser';

interface ICreateUser {
  username: string;
  email: string;
  password: string;
  salt: string;
}

export default async function createUser(
  userRepo: IUsersRepos,
  userRoleRepo: IUserRoleRepo,
  date: ICreateUser,
): Promise<User> {
  try {
    return await withTransaction({ userRepo, userRoleRepo }, async (repos) => {
      const user = await repos.userRepo.createUser(date);
      await giveDefaultRoleToUser(repos.userRoleRepo, user.id);
      return await repos.userRepo.getUserById(user.id);
    });
  } catch (error) {
    throw Error('Creating user error');
  }
}
