import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { authHook } from '../hooks/authHook';
import { FastifyRequest } from 'fastify';

const hooks: FastifyPluginAsyncZod = async (fastify) => {
  {
    fastify.addHook('preHandler', authHook);
    fastify.addHook('preHandler', async function (request: FastifyRequest) {
      if (request.skipAuth) {
        return;
      }
      const userData = { ...fastify.getUserDataFromJWT(request) };
      const roles = await this.repos.userRoleRepo.getUserRoles(userData.id);

      Object.assign(request, {
        userData: { id: userData.id, email: userData.email, username: userData.username },
        isAdmin: roles.some((r) => r.value === 'ADMIN'),
      });
    });
  }
};

export default hooks;
