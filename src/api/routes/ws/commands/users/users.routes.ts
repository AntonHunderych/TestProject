import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { addRemoveUserCommandSchema } from './schema/addRemoveUserCommandSchema';
import { removeUserFromCommand } from '../../../../../controllers/ws/commands/removeUserFromCommand';
import { addUserToCommand } from '../../../../../controllers/ws/commands/addUserToCommand';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceUserCommandRepo = f.repos.workSpaceUserCommandRepo;

  f.post(
    '/add',
    {
      schema: {
        body: addRemoveUserCommandSchema,
      },
    },
    async (req) => {
      return await addUserToCommand(workSpaceUserCommandRepo, req.body.userId, req.body.commandId);
    },
  );

  f.delete(
    '/remove',
    {
      schema: {
        body: addRemoveUserCommandSchema,
      },
    },
    async (req) => {
      return await removeUserFromCommand(
        workSpaceUserCommandRepo,
        req.workSpace.id,
        req.body.userId,
        req.body.commandId,
      );
    },
  );
};

export default routes;
