import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { permissionsAccessHook } from '../hooks/permissionsAccessHook';
import { Permissions } from '../../../../types/enum/EPermissions';
import { roleHook } from '../../../hooks/roleHook';
import { ERole } from '../../../../types/enum/ERole';
import { UUIDGetter } from '../../../common/schemas/UUIDGetter';
import z from 'zod';
import { getAllTodoInWorkSpaceByCommand } from '../../../../controllers/ws/todos/getAllTodoInWorkSpaceByCommand';
import { createTodo } from '../../../../controllers/ws/todos/createTodo';
import { deleteTodo } from '../../../../controllers/ws/todos/deleteTodo';
import { updateTodo } from '../../../../controllers/ws/todos/updateTodo';
import { getWorkSpaceTodoSchema } from './schema/getWorkSpaceTodoSchema';
import { createWorkSpaceTodoSchema } from './schema/createWorkSpaceTodoSchema';
import { updateWorkSpaceTodoSchema } from './schema/updateWorkSpaceTodoSchema';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceTodoRepo = f.repos.workSpaceTodoRepo;
  const workSpaceCommandRepo = f.repos.workSpaceUserCommandRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.get(
    '/',
    {
      schema: {
        response: {
          200: z.array(getWorkSpaceTodoSchema),
        },
      },
    },
    async (req) => {
      return await getAllTodoInWorkSpaceByCommand(
        workSpaceTodoRepo,
        workSpaceCommandRepo,
        req.workSpace.id,
        req.workSpace.workSpaceUserId,
      );
    },
  );

  f.post(
    '/',
    {
      schema: {
        body: createWorkSpaceTodoSchema,
        response: {
          200: getWorkSpaceTodoSchema,
        },
      },
      preHandler: permissionsAccessHook(Permissions.createTodo),
    },
    async (req) => {
      return await createTodo(workSpaceTodoRepo, req.body, req.workSpace.id, req.workSpace.workSpaceUserId);
    },
  );

  f.delete(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: z.boolean(),
        },
      },
      preHandler: permissionsAccessHook(Permissions.deleteTodo),
    },
    async (req) => {
      return await deleteTodo(workSpaceTodoRepo, req.params.id);
    },
  );

  f.put(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        body: updateWorkSpaceTodoSchema,
        response: {
          200: getWorkSpaceTodoSchema,
        },
      },
      preHandler: permissionsAccessHook(Permissions.changeTodo),
    },
    async (req) => {
      return await updateTodo(workSpaceTodoRepo, req.params.id, req.body);
    },
  );
};
export default routes;
