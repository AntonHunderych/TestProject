import { FastifyRequest } from 'fastify';

export function getUserDataFromJWT(req: FastifyRequest): { id: string; email: string; username: string } {
  return req.user as { id: string; email: string; username: string };
}
