import { IUsersRepos } from '../../repos/users/users.repo';
import ICrypto from '../../services/crypto/ICrypto';
import createUserHandler from '../users/createUser';
import { IUserRoleRepo } from '../../repos/userRole/userRole.repo';
import { ILoginRegisterResp } from './loginHandler';



export async function registerHandler(userRepo: IUsersRepos, userRoleRepo: IUserRoleRepo, crypto: ICrypto, userData: {
  username: string;
  email: string;
  password: string;
}): Promise<ILoginRegisterResp> {
  try {

    const user = await userRepo.getUserByEmail(userData.email);
    if (user) {
      throw new Error('User with this email already exists');
    }

    const { hash, salt } = await crypto.hash(userData.password);

    return  await createUserHandler(userRepo, userRoleRepo, {
      username: userData.username,
      email: userData.email,
      password: hash,
      salt
    });

  } catch (error) {
    throw error;
  }
}