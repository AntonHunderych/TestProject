import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { authHook } from '../hooks/authHook';
import { FastifyRequest } from 'fastify';

 const hooks: FastifyPluginAsyncZod =  async (fastify) => {{
  fastify.addHook('preHandler', authHook);
  fastify.addHook('preHandler', async function (request: FastifyRequest) {
    const userData = { ...fastify.getUserDataFromJWT(request), isAdmin: false };

    const user = await this.repos.userRepo.getUserById(userData.id);

    Object.assign(request, { userData: { ...userData, isAdmin: user.roles.some((r) => r.value === 'ADMIN') } });
  });
}}

export default hooks;