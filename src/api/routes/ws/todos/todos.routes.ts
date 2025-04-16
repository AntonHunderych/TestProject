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
import { getWorkSpaceTodoSchema } from './schema/getWorkSpaceTodoSchema';
import { createWorkSpaceTodoSchema } from './schema/createWorkSpaceTodoSchema';
import { updateWorkSpaceTodoSchema } from './schema/updateWorkSpaceTodoSchema';
import { onNotification } from '../../../../controllers/ws/notification/onNotification';
import { offNotification } from '../../../../controllers/ws/notification/offNotification';
import { createTodoProcess } from '../../../../controllers/ws/todos/createTodoProcess';
import { deleteTodoProcess } from '../../../../controllers/ws/todos/deleteTodoProcess';
import { updateTodoProcess } from '../../../../controllers/ws/todos/updateTodoProcess';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceTodoRepo = f.repos.workSpaceTodoRepo;
  const workSpaceCommandRepo = f.repos.workSpaceUserCommandRepo;
  const workSpaceGoogleCalendarTokenRepo = f.repos.workSpaceGoogleCalendarTokenRepo;

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
      return await createTodoProcess(
        workSpaceTodoRepo,
        req.body,
        req.workSpace.id,
        req.workSpace.workSpaceUserId,
        f.addCalendarJob,
      );
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
      return deleteTodoProcess(
        workSpaceTodoRepo,
        workSpaceGoogleCalendarTokenRepo,
        req.params.id,
        req.workSpace.id,
        f.addCalendarJob,
      );
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
      return await updateTodoProcess(
        workSpaceTodoRepo,
        f.notification,
        f.mailSender,
        req.params.id,
        req.body,
        f.addCalendarJob,
      );
    },
  );

  f.post(
    '/notification/on/:id',
    {
      schema: {
        params: UUIDGetter,
      },
    },
    async (req) => {
      await onNotification(workSpaceTodoRepo, f.notification, f.mailSender, req.params.id);
    },
  );

  f.delete(
    '/notification/off/:id',
    {
      schema: {
        params: UUIDGetter,
      },
    },
    async (req) => {
      await offNotification(workSpaceTodoRepo, f.notification, req.params.id);
    },
  );
};
export default routes;
