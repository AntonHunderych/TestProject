import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../hooks/roleHook';
import z from 'zod';
import { TodoSchemaResp } from './schemas/getTodoShema';
import { UUIDGetter } from '../schemas/UUIDGetter';
import { createTodoSchema } from './schemas/createTodoSchema';
import { createTodosHandler } from '../../../controllers/todos/todos.create';
import { getAllUserTodos } from '../../../controllers/todos/getAllUserTodos';
import { updateTodoSchema } from './schemas/updateTodoSchema';
import { RoleEnum } from '../../../Types/Enum/RoleEnum';

export const routes: FastifyPluginAsyncZod = async function (fastify) {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const todoRepo = f.repos.todoRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));

  f.get(
    '/admin/',
    {
      schema: {
        response: {
          200: z.array(TodoSchemaResp),
        },
      },
      preHandler: roleHook([RoleEnum.ADMIN]),
    },
    async () => {
      return await todoRepo.findAll();
    },
  );
  f.get(
    '/admin/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: TodoSchemaResp,
        },
      },
      preHandler: roleHook([RoleEnum.ADMIN]),
    },
    async (req) => {
      return await todoRepo.findById(req.params.id);
    },
  );

  f.get(
    '/user/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: z.array(TodoSchemaResp),
        },
      },
    },
    async (req) => {
      return await getAllUserTodos(todoRepo, req.params.id);
    },
  );

  f.get(
    '/user/',
    {
      schema: {
        response: {
          200: z.array(TodoSchemaResp),
        },
      },
    },
    async (req) => {
      const userData = f.getUserDataFromJWT(req);
      return await getAllUserTodos(todoRepo, userData.id);
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
    },
    async (req) => {
      const userData = f.getUserDataFromJWT(req);
      return await createTodosHandler(todoRepo, {
        ...req.body,
        creatorId: userData.id,
      });
    },
  );

  f.put(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        body: updateTodoSchema,
        response: {
          200: TodoSchemaResp,
        },
      },
    },
    async (req) => {
      return await todoRepo.update(req.params.id, req.body);
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
      return await todoRepo.delete(req.params.id);
    },
  );
};
export default routes;
