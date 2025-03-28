import { FastifyReply } from 'fastify';

export function setRefreshTokenCookie(reply: FastifyReply, refreshToken: string) {
  reply.setCookie('refreshToken', refreshToken, {
    path: '/api/auth',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });
}
