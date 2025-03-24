import { JWT } from 'fastify-jwt';
import { ITokenRepo } from '../../repos/token/token.repo';

export interface IInputTokenData {
  id: string;
  username: string;
  email: string;
}

export interface IOutputTokenData {
  accessToken: string;
  refreshToken: string;
}

export async function generateTokens(data: IInputTokenData, jwt: JWT, tokenRepo: ITokenRepo): Promise<IOutputTokenData> {
  try {
    const accessToken = jwt.sign(data);
    const refreshToken = jwt.sign(data, { expiresIn: '7d' });

    await tokenRepo.saveRefreshToken(data.id, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  } catch (e) {
    console.error('Fail to generate tokens', e);
    throw e;
  }
}