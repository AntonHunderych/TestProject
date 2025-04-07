import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { UUIDGetter } from '../../../../common/schemas/UUIDGetter';
import { roleHook } from '../../../../hooks/roleHook';
import { dataFetchHook } from '../../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../../hooks/accessToWorkSpaceHook';
import { RoleEnum } from '../../../../../types/enum/RoleEnum';
import { addCommandTodoSchema } from './schema/addCommandTodoSchema';
import { removeCommandFromTodo } from '../../../../../controllers/ws/commands/removeCommandFromTodo';
import { addCommandToTodo } from '../../../../../controllers/ws/commands/addCommandToTodo';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceCommandsTodoRepo = f.repos.workSpaceCommandTodoRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.post(
    '/add',
    {
      schema: {
        body: addCommandTodoSchema,
      },
    },
    async (req) => {
      await addCommandToTodo(workSpaceCommandsTodoRepo, req.body.todoId, req.body.command);
    },
  );

  f.delete(
    '/remove/:id',
    {
      schema: {
        params: UUIDGetter,
      },
    },
    async (req) => {
      await removeCommandFromTodo(workSpaceCommandsTodoRepo, req.params.id);
    },
  );
};

export default routes;
