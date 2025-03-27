import { ITokenRepo } from '../../repos/token/token.repo';
import { JWT } from 'fastify-jwt';
import { ApplicationError } from '../../types/errors/ApplicationError';

export async function refreshToken(refreshToken: string, jwt: JWT, tokenRepo: ITokenRepo): Promise<{ token: string }> {
  try {
    const refreshTokenDB = await tokenRepo.findTokenById(refreshToken);
    const userData = jwt.verify(refreshTokenDB.value) as { id: string; email: string; username: string };
    if (refreshTokenDB.id !== userData.id) {
      throw new Error('Invalid refresh token');
    }
    return {
      token: jwt.sign({
        id: userData.id,
        email: userData.email,
        username: userData.username,
      }),
    };
  } catch (error) {
    throw new ApplicationError('Error by refreshing token', error);
  }
}
