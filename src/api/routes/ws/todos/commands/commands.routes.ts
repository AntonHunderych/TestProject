import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { UUIDGetter } from '../../../schemas/UUIDGetter';
import { roleHook } from '../../../../hooks/roleHook';
import { RoleEnum } from '../../../../../types/Enum/RoleEnum';
import { dataFetchHook } from '../../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../../hooks/accessToWorkSpaceHook';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceCommandsTodoRepo = f.repos.workSpaceCommandsTodoRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.post(
    '/',
    {
      schema: {
        body: z.object({
          todoId: z.string(),
          command: z.string(),
        }),
      },
    },
    async (req) => {
      await workSpaceCommandsTodoRepo.addCommandToTodo(req.body.todoId, req.workSpace.id, req.body.command);
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
      await workSpaceCommandsTodoRepo.removeCommandFromTodo(req.params.id);
    },
  );
};

export default routes;
