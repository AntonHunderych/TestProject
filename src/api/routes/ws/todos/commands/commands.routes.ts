import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { UUIDGetter } from '../../../../common/schemas/UUIDGetter';
import { roleHook } from '../../../../hooks/roleHook';
import { dataFetchHook } from '../../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../../hooks/accessToWorkSpaceHook';
import { ERole } from '../../../../../types/enum/ERole';
import { addCommandTodoSchema } from './schema/addCommandTodoSchema';
import { addCommandToTodoProcess } from '../../../../../controllers/ws/commands/addCommandToTodoProcess';
import { removeCommandFromTodoProcess } from '../../../../../controllers/ws/commands/removeCommandFromTodoProcess';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceCommandsTodoRepo = f.repos.workSpaceCommandTodoRepo;
  const workSpaceTodoRepo = f.repos.workSpaceTodoRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));
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
      await addCommandToTodoProcess(
        workSpaceTodoRepo,
        f.addCalendarJob,
        req.workSpace.id,
        workSpaceCommandsTodoRepo,
        req.body.todoId,
        req.body.command,
      );
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
      await removeCommandFromTodoProcess(
        workSpaceTodoRepo,
        f.addCalendarJob,
        req.workSpace.id,
        workSpaceCommandsTodoRepo,
        req.params.id,
      );
    },
  );
};

export default routes;
