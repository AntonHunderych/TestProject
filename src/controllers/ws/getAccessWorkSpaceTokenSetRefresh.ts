import { JWT } from 'fastify-jwt';
import { ITokenRepo } from '../../repos/token/token.repo';
import { FastifyReply } from 'fastify';
import { IWorkSpaceUserRepo } from '../../repos/workspace/user/workSpaceUser.repo';
import { generateTokensThenGetAccessToken } from '../auth/generateTokensThenGetAccessToken';

export async function getAccessWorkSpaceTokenSetRefresh(
  userData: any,
  workSpaceId: string,
  workSpaceUserRepo: IWorkSpaceUserRepo,
  jwt: JWT,
  tokenRepo: ITokenRepo,
  reply: FastifyReply,
) {
  const user = await workSpaceUserRepo.existUserInWorkSpace(workSpaceId, userData.id);
  const data = {
    ...userData,
    workSpaceId,
    workSpaceUserId: user?.id,
  };
  const accessToken = await generateTokensThenGetAccessToken(data, jwt, tokenRepo, reply);
  return {
    workSpaceAccessToken: accessToken,
  };
}
