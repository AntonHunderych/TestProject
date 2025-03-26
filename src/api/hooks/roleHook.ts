import { FastifyReply, FastifyRequest, preHandlerAsyncHookHandler } from 'fastify';
import { HttpError } from '../error/HttpError';

export function roleHook(requiredRoles: string[]) {
  const hook: preHandlerAsyncHookHandler = async function (req: FastifyRequest, _reply: FastifyReply) {
    const roles = await this.repos.userRoleRepo.getUserRoles(req.userData.id);

    if (roles.length === 0) {
      throw new HttpError(403, 'You·dont·have·permission·to·access·this·resource');
    }

    for (const requiredRole of requiredRoles) {
      if (!roles.some((role) => role.value === requiredRole)) {
        throw new HttpError(403, 'You·dont·have·permission·to·access·this·resource');
      }
    }
  };
  return hook;
}
