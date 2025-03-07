import { FastifyRequest } from 'fastify';

export async function skipAuthHook(req: FastifyRequest) {
  req.skipAuth = true;
}
