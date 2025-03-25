import { IUsersRepos } from '../../repos/users/users.repo';
import ICrypto from '../../services/crypto/ICrypto';
import createUser from '../users/createUser';
import { IUserRoleRepo } from '../../repos/userRole/userRole.repo';
import { ILoginRegisterResp } from './login';
import { HttpError } from '../../api/error/HttpError';

export async function register(
  userRepo: IUsersRepos,
  userRoleRepo: IUserRoleRepo,
  crypto: ICrypto,
  userData: {
    username: string;
    email: string;
    password: string;
  },
): Promise<ILoginRegisterResp> {
  try {
    const user = await userRepo.getUserByEmail(userData.email);
    if (user) {
      throw new HttpError(400, 'User with this email already exists');
    }

    const { hash, salt } = await crypto.hash(userData.password);

    return await createUser(userRepo, userRoleRepo, {
      username: userData.username,
      email: userData.email,
      password: hash,
      salt,
    });
  } catch (error) {
    throw error;
  }
}
