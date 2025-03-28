import { IUsersRepo } from '../../repos/users/users.repo';
import ICrypto from '../../services/crypto/ICrypto';
import createUser from '../users/createUser';
import { IUserRoleRepo } from '../../repos/userRole/userRole.repo';
import { ILoginRegisterResp } from './login';
import { HttpError } from '../../api/error/HttpError';
import { ApplicationError } from '../../types/errors/ApplicationError';
import { existUser } from '../users/existUser';
import { IRolesRepo } from '../../repos/roles/roles.repo';
import { IWithTransaction } from '../../services/withTransaction/IWithTransaction';

export async function register(
  withTransaction: IWithTransaction,
  userRepo: IUsersRepo,
  userRoleRepo: IUserRoleRepo,
  roleRepo: IRolesRepo,
  crypto: ICrypto,
  userData: {
    username: string;
    email: string;
    password: string;
  },
): Promise<ILoginRegisterResp> {
  const user = await existUser(userRepo, userData.email);
  if (user) {
    throw new HttpError(400, 'User with this email already exists');
  }
  try {
    const { hash, salt } = await crypto.hash(userData.password);

    return await createUser(withTransaction, userRepo, roleRepo, userRoleRepo, {
      username: userData.username,
      email: userData.email,
      password: hash,
      salt,
    });
  } catch (error) {
    throw new ApplicationError('register error', error);
  }
}
