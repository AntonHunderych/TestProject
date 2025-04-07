import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../hooks/roleHook';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import { ERole } from '../../../../types/enum/ERole';
import { UUIDGetter } from '../../../common/schemas/UUIDGetter';
import { createCommand } from '../../../../controllers/ws/commands/createCommand';
import { updateCommandSchema } from './schema/updateCommandSchema';
import { updateCommand } from '../../../../controllers/ws/commands/updateCommand';
import { deleteCommand } from '../../../../controllers/ws/commands/deleteCommand';
import { createCommandSchema } from './schema/createCommandSchema';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceCommandRepo = f.repos.workSpaceCommandRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.post(
    '/',
    {
      schema: {
        body: createCommandSchema,
      },
    },
    async (req) => {
      return await createCommand(workSpaceCommandRepo, req.workSpace.id, req.body.value);
    },
  );

  f.put(
    '/',
    {
      schema: {
        body: updateCommandSchema,
      },
    },
    async (req) => {
      return await updateCommand(workSpaceCommandRepo, req.body.commandId, req.body.value);
    },
  );

  f.delete(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
      },
    },
    async (req) => {
      return await deleteCommand(workSpaceCommandRepo, req.params.id);
    },
  );
};

export default routes;
