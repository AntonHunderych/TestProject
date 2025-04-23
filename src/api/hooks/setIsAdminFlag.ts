import { FastifyRequest, preHandlerAsyncHookHandler } from 'fastify';

export const setIsAdminFlag: preHandlerAsyncHookHandler = async function (request: FastifyRequest) {
  if (request.skipAuth) {
    return;
  }
  const userData = { ...this.getUserDataFromJWT(request) };
  const roles = await this.repos.userRoleRepo.getUserRoles(userData.id);

  Object.assign(request, {
    userData: { id: userData.id, email: userData.email, username: userData.username },
    isAdmin: roles.some((r) => r.value === 'ADMIN'),
  });
};
