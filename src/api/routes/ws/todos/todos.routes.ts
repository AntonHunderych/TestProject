import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { createTodoSchema } from './schema/createTodoSchema';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { permissionsAccessHook } from '../hooks/permissionsAccessHook';
import { Permissions } from '../../../../Types/Enum/PermisionsEnum';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const wsTodoRepo = f.repos.workSpaceTodoRepo;

  f.post(
    '/',
    {
      schema: {
        body: createTodoSchema,
      },
      preHandler: [dataFetchHook,accessToWorkSpaceHook,permissionsAccessHook(Permissions.createTodo)],
    },
    async (req) => {
      return await wsTodoRepo.create({ ...req.body, workSpaceId: req.workSpace.id, creatorId: req.userData.id });
    },
  );
};
export default routes;
