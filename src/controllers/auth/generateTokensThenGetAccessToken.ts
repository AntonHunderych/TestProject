import { JWT } from 'fastify-jwt';
import { ITokenRepo } from '../../repos/token/token.repo';
import { generateTokens } from './generateTokens';
import { FastifyReply } from 'fastify';
import { setRefreshTokenCookie } from './setRefreshTokenCookie';
import { TGenerateTokensInputData } from '../../types/controllers/TGenerateTokensInputData';

export async function generateTokensThenGetAccessToken(
  data: TGenerateTokensInputData,
  jwt: JWT,
  tokenRepo: ITokenRepo,
  reply: FastifyReply,
): Promise<string> {
  const { accessToken, refreshToken } = await generateTokens(data, jwt, tokenRepo);
  setRefreshTokenCookie(reply, refreshToken);
  return accessToken;
}
