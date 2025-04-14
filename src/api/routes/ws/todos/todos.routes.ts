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
import { onNotification } from '../../../../controllers/ws/notification/onNotification';
import { offNotification } from '../../../../controllers/ws/notification/offNotification';
import { insertTodoSynchronizeGoogleCalendar } from '../../../../controllers/ws/googleCalendar/synchronize/insertTodoSynchronizeGoogleCalendar';
import { deleteTodoSynchronizeGoogleCalendar } from '../../../../controllers/ws/googleCalendar/synchronize/deleteTodoSynchronizeGoogleCalendar';
import { updateTodoSynchronizeGoogleCalendar } from '../../../../controllers/ws/googleCalendar/synchronize/updateTodoSynchronizeGoogleCalendar';

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
      const todo = await createTodo(workSpaceTodoRepo, req.body, req.workSpace.id, req.workSpace.workSpaceUserId);
      await insertTodoSynchronizeGoogleCalendar(
        f.withTransaction,
        f.calendar,
        f.repos.workSpaceGoogleCalendarTokenRepo,
        f.repos.workSpaceGoogleCalendarEventRepo,
        req.workSpace.id,
        todo,
      );
      return todo;
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
      await deleteTodoSynchronizeGoogleCalendar(
        f.withTransaction,
        f.calendar,
        f.repos.workSpaceGoogleCalendarTokenRepo,
        f.repos.workSpaceGoogleCalendarEventRepo,
        req.workSpace.id,
        req.params.id,
      );
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
      const newTodo = await updateTodo(workSpaceTodoRepo, f.notification, f.mailSender, req.params.id, req.body);
      await updateTodoSynchronizeGoogleCalendar(
        f.withTransaction,
        f.calendar,
        f.repos.workSpaceGoogleCalendarTokenRepo,
        f.repos.workSpaceGoogleCalendarEventRepo,
        req.workSpace.id,
        newTodo,
        req.body,
      );
      return newTodo;
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
