import { IUserRepo } from '../../repos/users/users.repo';
import { IUserRoleRepo } from '../../repos/userRole/userRole.repo';
import ICrypto from '../../services/crypto/ICrypto';
import { JWT } from 'fastify-jwt';
import { register } from './register';
import { ITokenRepo } from '../../repos/token/token.repo';
import { FastifyReply } from 'fastify';
import { generateTokensThenGetAccessToken } from './generateTokensThenGetAccessToken';
import { IRolesRepo } from '../../repos/roles/roles.repo';
import { IWithTransaction } from '../../services/withTransaction/IWithTransaction';

export async function registrationProcess(
  withTransaction: IWithTransaction,
  userRepo: IUserRepo,
  userRoleRepo: IUserRoleRepo,
  tokenRepo: ITokenRepo,
  roleRepo: IRolesRepo,
  crypto: ICrypto,
  jwt: JWT,
  registrationData: {
    username: string;
    email: string;
    password: string;
  },
  reply: FastifyReply,
): Promise<string> {
  const user = await register(withTransaction, userRepo, userRoleRepo, roleRepo, crypto, registrationData);
  return await generateTokensThenGetAccessToken(
    { id: user.id, username: user.username, email: user.email },
    jwt,
    tokenRepo,
    reply,
  );
}
