import { JWT } from 'fastify-jwt';
import { ITokenRepo } from '../../repos/token/token.repo';
import { ApplicationError } from '../../types/errors/ApplicationError';
import { TGenerateTokensInputData } from '../../types/controllers/TGenerateTokensInputData';
import { TGenerateTokensOutputData } from '../../types/controllers/TGenerateTokensOutputData';

export async function generateTokens(
  data: TGenerateTokensInputData,
  jwt: JWT,
  tokenRepo: ITokenRepo,
): Promise<TGenerateTokensOutputData> {
  try {
    const accessToken = jwt.sign(data);
    const refreshToken = jwt.sign(data, { expiresIn: '7d' });

    await tokenRepo.saveRefreshToken(data.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  } catch (e) {
    throw new ApplicationError('Error in generateTokens', e);
  }
}
