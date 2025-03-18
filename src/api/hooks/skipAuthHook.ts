import { FastifyRequest } from 'fastify';

export async function skipAuthHook(req: FastifyRequest) {
  Object.assign(req, { ...req, skipAuth: true });
}
