import { ITokenRepo } from '../../repos/token/token.repo';
import { JWT } from 'fastify-jwt';

export async function refreshToken(refreshToken: string, jwt: JWT, tokenRepo: ITokenRepo): Promise<{ token: string }> {
  try {
    const refreshTokenDB = await tokenRepo.findTokenById(refreshToken);
    if (refreshTokenDB.value !== refreshToken) {
      throw new Error('Invalid refresh token');
    }
    const userData = jwt.verify(refreshTokenDB.value) as { id: string; email: string; username: string };
    return {
      token: jwt.sign({
        id: userData.id,
        email: userData.email,
        username: userData.username,
      }),
    };
  } catch (error) {
    throw error;
  }
}
