import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../hooks/roleHook';
import { RoleEnum } from '../../../../types/enum/RoleEnum';
import { getTodoSchema } from '../../todos/schemas/getTodoShema';
import z from 'zod';
import { getAllUserTodos } from '../../../../controllers/todos/getAllUserTodos';
import { UUIDGetter } from '../../../common/schemas/UUIDGetter';
import { getTodoById } from '../../../../controllers/todos/getTodoById';
import { getAllTodos } from '../../../../controllers/todos/getAllTodos';

export const routes: FastifyPluginAsyncZod = async function (fastify) {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const todoRepo = f.repos.todoRepo;

  f.addHook('preHandler', roleHook([RoleEnum.ADMIN]));

  f.get(
    '/',
    {
      schema: {
        response: {
          200: z.array(getTodoSchema),
        },
      },
    },
    async () => {
      return await getAllTodos(todoRepo);
    },
  );
  f.get(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: getTodoSchema,
        },
      },
    },
    async (req) => {
      return await getTodoById(todoRepo, req.params.id);
    },
  );

  f.get(
    '/user/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: z.array(getTodoSchema),
        },
      },
    },
    async (req) => {
      return await getAllUserTodos(todoRepo, req.params.id);
    },
  );
};
export default routes;
