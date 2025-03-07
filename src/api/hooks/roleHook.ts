import { FastifyReply, FastifyRequest, preHandlerAsyncHookHandler } from 'fastify';

export function roleHook(requiredRoles: string[]) {
  const hook: preHandlerAsyncHookHandler = async function (req: FastifyRequest, reply: FastifyReply) {
    const userData = req.user as { id: string; email: string; username: string };
    if (!userData) {
      return;
    }
    const user = await this.repos.userRepo.getUserById(userData.id);

    for (const role of requiredRoles) {
      if (!user.roles.some((r) => r.value === role)) {
        reply.status(403).send({ message: "You·don't·have·permission·to·access·this·resource" });
      }
    }
  };
  return hook;
}
