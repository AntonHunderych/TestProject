import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../hooks/roleHook';
import z from 'zod';
import { getAllTodos } from '../../../controllers/todos/getAllTodos';
import { UUIDGetter } from '../../common/schemas/UUIDGetter';
import { TodoSchemaResp } from './schemas/getTodoShema';
import { getTodoById } from '../../../controllers/todos/getTodoById';
import { getAllUserTodos } from '../../../controllers/todos/getAllUserTodos';
import { createTodoSchema } from './schemas/createTodoSchema';
import { createTodo } from '../../../controllers/todos/createTodo';
import { updateTodoSchema } from './schemas/updateTodoSchema';
import { updateTodo } from '../../../controllers/todos/updateTodo';
import { deleteTodo } from '../../../controllers/todos/deleteTodo';
import { RoleEnum } from '../../../types/enum/RoleEnum';

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
      return await getAllTodos(todoRepo);
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
      return await getTodoById(todoRepo, req.params.id);
    },
  );

  f.get(
    '/user/admin/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: z.array(TodoSchemaResp),
        },
      },
      preHandler: roleHook([RoleEnum.ADMIN]),
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
      return await getAllUserTodos(todoRepo, req.userData.id);
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
      return await createTodo(todoRepo, {
        ...req.body,
        creatorId: req.userData.id,
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
      return await updateTodo(todoRepo, req.params.id, req.body);
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
    },
    async (req) => {
      return await deleteTodo(todoRepo, req.params.id);
    },
  );
};
export default routes;
