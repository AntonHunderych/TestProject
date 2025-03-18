import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { permissionsAccessHook } from '../hooks/permissionsAccessHook';
import { Permissions } from '../../../../Types/Enum/PermisionsEnum';
import { createTodoSchema } from '../../todos/schemas/createTodoSchema';
import { roleHook } from '../../../hooks/roleHook';
import { RoleEnum } from '../../../../Types/Enum/RoleEnum';
import { UUIDGetter } from '../../schemas/UUIDGetter';
import z from 'zod';
import { TodoSchemaResp } from '../../todos/schemas/getTodoShema';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const wsTodoRepo = f.repos.workSpaceTodoRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.get(
    '/',
    {
      schema: {
        response: {
          200: z.array(TodoSchemaResp),
        },
      },
    },
    async (req) => {
      return await wsTodoRepo.findAllTodoInWorkSpace(req.workSpace.id);
    },
  );

  f.get(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: TodoSchemaResp,
        },
      },
    },
    async (req) => {
      return await wsTodoRepo.findById(req.params.id);
    },
  );

  f.post(
    '/',
    {
      schema: {
        body: createTodoSchema,
        response: {
          200: TodoSchemaResp,
        },
      },
      preHandler: permissionsAccessHook(Permissions.createTodo),
    },
    async (req) => {
      return await wsTodoRepo.create(req.body, req.workSpace.id, req.userData.id);
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
      return await wsTodoRepo.delete(req.params.id);
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
      return await wsTodoRepo.update(req.params.id, req.body);
    },
  );
};
export default routes;
