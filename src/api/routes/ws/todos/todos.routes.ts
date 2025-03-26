import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { permissionsAccessHook } from '../hooks/permissionsAccessHook';
import { Permissions } from '../../../../types/enum/PermisionsEnum';
import { createTodoSchema } from '../../todos/schemas/createTodoSchema';
import { roleHook } from '../../../hooks/roleHook';
import { RoleEnum } from '../../../../types/enum/RoleEnum';
import { UUIDGetter } from '../../schemas/UUIDGetter';
import z from 'zod';
import { filterEntityByUserCommand } from '../hooks/filterEntityByUserCommand';
import { WorkSpaceTodo } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { getAllTodoInWorkSpaceByCommand } from '../../../../controllers/ws/todos/getAllTodoInWorkSpaceByCommand';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceTodoRepo = f.repos.workSpaceTodoRepo;
  const workSpaceCommandRepo = f.repos.workSpaceCommandRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.get(
    '/admin/',
    {
      schema: {
        /*response: {
          200: z.array(TodoSchemaResp),
        },*/
      },
      preHandler: roleHook([RoleEnum.ADMIN]),
      preSerialization: filterEntityByUserCommand<WorkSpaceTodo>(),
    },
    async (req) => {
      return await workSpaceTodoRepo.findAllTodoInWorkSpace(req.workSpace.id);
    },
  );

  f.get(
    '/',
    {
      schema: {},
    },
    async (req) => {
      return await getAllTodoInWorkSpaceByCommand(
        workSpaceTodoRepo,
        workSpaceCommandRepo,
        req.workSpace.id,
        req.userData.id,
      );
    },
  );

  f.get(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          //200: TodoSchemaResp
        },
      },
    },
    async (req) => {
      return await workSpaceTodoRepo.findById(req.params.id);
    },
  );

  f.post(
    '/',
    {
      schema: {
        body: createTodoSchema,
        response: {
          //200: TodoSchemaResp
        },
      },
      preHandler: permissionsAccessHook(Permissions.createTodo),
    },
    async (req) => {
      return await workSpaceTodoRepo.create(req.body, req.workSpace.id, req.userData.id);
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
      return await workSpaceTodoRepo.delete(req.params.id);
    },
  );

  f.put(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        body: createTodoSchema.partial(),
      },
      preHandler: permissionsAccessHook(Permissions.changeTodo),
    },
    async (req) => {
      return await workSpaceTodoRepo.update(req.params.id, req.body);
    },
  );
};
export default routes;
