import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyRequest {
    starTimeMS: number;
  }
}

const plugin: FastifyPluginAsync = async function (fastify) {
  fastify.addHook('onRequest', async (request) => {
    request.starTimeMS = Date.now();
  });

  fastify.addHook('onSend', async (request) => {
    const responseTime = Date.now() - request.starTimeMS;
    console.log(`[${request.method}] ${request.url} - ${responseTime}ms`);
  });
};

export default fp(plugin, '5.x');