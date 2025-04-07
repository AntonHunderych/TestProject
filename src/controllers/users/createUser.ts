import { IUserRepo } from '../../repos/users/users.repo';
import { IUserRoleRepo } from '../../repos/userRole/userRole.repo';
import { giveDefaultRoleToUser } from '../userRole/giveDefaultRoleToUser';
import { User } from '../../types/entities/UserSchema';
import { IRolesRepo } from '../../repos/roles/roles.repo';
import { TCreateUserInput } from '../../types/controllers/TCreateUserInput';
import { IWithTransaction } from '../../services/withTransaction/IWithTransaction';

export default async function createUser(
  withTransaction: IWithTransaction,
  userRepo: IUserRepo,
  roleRepo: IRolesRepo,
  userRoleRepo: IUserRoleRepo,
  date: TCreateUserInput,
): Promise<User> {
  try {
    return await withTransaction({ userRepo, userRoleRepo, roleRepo }, async (repos) => {
      const user = await repos.userRepo.createUser(date);
      await giveDefaultRoleToUser(repos.userRoleRepo, repos.roleRepo, user.id);
      return await repos.userRepo.getUserById(user.id);
    });
  } catch (error) {
    throw Error('Creating user error');
  }
}
