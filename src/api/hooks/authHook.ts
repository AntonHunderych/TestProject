import { FastifyReply, FastifyRequest, preHandlerAsyncHookHandler } from 'fastify';

export const authHook: preHandlerAsyncHookHandler = async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    if (request.skipAuth) {
      return;
    }

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      reply.status(401).send({ message: 'Token is required' });
      return;
    }

    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ message: 'Invalid or expired token' });
  }
};
