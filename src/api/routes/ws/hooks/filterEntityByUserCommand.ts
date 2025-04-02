import { FastifyReply, FastifyRequest, preSerializationAsyncHookHandler } from 'fastify';

interface EntityWithCommand {
  command: { value: string } | null;
}

export const filterEntityByUserCommand = <T extends EntityWithCommand>(): preSerializationAsyncHookHandler => {
  return async function (request: FastifyRequest, _reply: FastifyReply, payload): Promise<T[]> {
    if (!Array.isArray(payload)) {
      throw new Error('Bad payload');
    }

    const payloadArray = payload as T[];

    const workSpaceUserCommandRepo = this.repos.workSpaceUserCommandRepo;
    const userCommands = await workSpaceUserCommandRepo.getUserCommands(request.userData.id, request.workSpace.id);

    const userCommandsValue = new Set<string>(userCommands.map((command) => command.value));

    return payloadArray.filter((data) => {
      if (data.command === null) {
        return true;
      } else {
        return userCommandsValue.has(data.command.value);
      }
    });
  };
};
