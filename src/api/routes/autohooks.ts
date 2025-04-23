import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { authHook } from '../hooks/authHook';
import { setIsAdminFlag } from '../hooks/setIsAdminFlag';

const hooks: FastifyPluginAsyncZod = async (fastify) => {
  {
    fastify.addHook('preHandler', authHook);
    fastify.addHook('preHandler', setIsAdminFlag);
  }
};

export default hooks;
