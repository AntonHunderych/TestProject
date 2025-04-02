import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { FastifyInstance } from 'fastify';
import z from 'zod';
import { roleHook } from '../../../../hooks/roleHook';
import { dataFetchHook } from '../../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../../hooks/accessToWorkSpaceHook';
import { UUIDGetter } from '../../../../common/schemas/UUIDGetter';
import { RoleEnum } from '../../../../../types/enum/RoleEnum';

const routers: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceCategoriesRepo = f.repos.workSpaceCategoryRepo;
  const workSpaceTodoRepo = f.repos.workSpaceTodoRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.post(
    '/',
    {
      schema: {
        body: z.object({
          value: z.string(),
          description: z.string().optional(),
        }),
      },
    },
    async (req) => {
      return await workSpaceCategoriesRepo.create(req.workSpace.id, { ...req.body, creatorId: req.userData.id });
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
      return await workSpaceCategoriesRepo.delete(req.params.id);
    },
  );

  f.get(
    '/',
    {
      schema: {},
    },
    async (req) => {
      return await workSpaceCategoriesRepo.get(req.workSpace.id);
    },
  );

  f.put(
    '/',
    {
      schema: {
        body: z.object({
          categoryId: z.string(),
          value: z.string(),
          description: z.string().optional(),
        }),
      },
    },
    async (req) => {
      return await workSpaceCategoriesRepo.update(req.body.categoryId, req.body.value, req.body.description);
    },
  );

  f.post(
    '/add',
    {
      schema: {
        body: z.object({
          categoryId: z.string(),
          todoId: z.string(),
        }),
      },
    },
    async (req) => {
      return await workSpaceTodoRepo.setCategoryToTodo(req.body.todoId, req.body.categoryId, req.userData.id);
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
      return await workSpaceTodoRepo.removeCategoryTodo(req.params.id);
    },
  );
};

export default routers;
