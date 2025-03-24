import { FastifyReply } from 'fastify';

export function setRefreshTokenCookie (reply: FastifyReply, refreshToken:string) {
  reply.setCookie(
    'refreshToken',
    refreshToken,
    {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7
    }
  );
}