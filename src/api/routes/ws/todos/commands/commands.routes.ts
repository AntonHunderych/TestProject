import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { UUIDGetter } from '../../../schemas/UUIDGetter';
import { roleHook } from '../../../../hooks/roleHook';
import { dataFetchHook } from '../../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../../hooks/accessToWorkSpaceHook';
import { RoleEnum } from '../../../../../types/enum/RoleEnum';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceCommandsTodoRepo = f.repos.workSpaceCommandTodoRepo;

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
