import { IUserRepo } from '../../repos/users/users.repo';
import ICrypto from '../../services/crypto/ICrypto';

export interface ILoginRegisterResp {
  id: string;
  username: string;
  email: string;
}

export async function login(
  userRepo: IUserRepo,
  crypto: ICrypto,
  password: string,
  email: string,
): Promise<ILoginRegisterResp> {
  const user = await userRepo.getUserByEmail(email);

  if (!user) {
    throw new Error();
  }

  const isValidPassword = await crypto.compare(password, user.password, user.salt);
  if (!isValidPassword) {
    throw new Error();
  }

  return { email, username: user.username, id: user.id };
}
