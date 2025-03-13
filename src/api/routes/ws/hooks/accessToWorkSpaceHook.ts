import { FastifyReply, FastifyRequest, preHandlerAsyncHookHandler } from 'fastify';

export function accessToWorkSpaceHookArgWorkSpaceId(workSpaceId:string): preHandlerAsyncHookHandler{
  return  async function (request: FastifyRequest, reply: FastifyReply) {

    if (request.userData.isAdmin)
      return

    const userWorkSpaceRepo = this.repos.workSpaceUserRepo;

    const user = await userWorkSpaceRepo.existUserInWorkSpace(workSpaceId, request.userData.id);

    if (!user) {
      reply.status(401).send({ message: 'You dont have access to this WorkSpace' });
      return;
    }
  }
}

export const accessToWorkSpaceHook: preHandlerAsyncHookHandler = async function (request: FastifyRequest, reply: FastifyReply){
  const userWorkSpaceRepo = this.repos.workSpaceUserRepo;

  const user = await userWorkSpaceRepo.existUserInWorkSpace(request.workSpace.id, request.userData.id);

  if (!user) {
    reply.status(401).send({ message: 'You dont have access to this WorkSpace' });
    return;
  }
}

