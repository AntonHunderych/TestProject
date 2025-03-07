import { IUsersRepos } from '../../repos/users/users.repos';
import ICrypto from '../../services/crypto/ICrypto';

export interface IRegisterResp {
  id: string;
  username: string;
  email: string;
}

export async function registerHandler(
  userRepo: IUsersRepos,
  crypto: ICrypto,
  password: string,
  email: string,
): Promise<IRegisterResp> {
  const user = await userRepo.getUserByEmail(email);

  if (!user) {
    throw new Error('Bad data');
  }

  const isValidPassword = await crypto.compare(password, user.password, user.salt);
  if (!isValidPassword) {
    throw new Error('Bad data');
  }

  return { email, username: user.username, id: user.id };
}
