import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { FastifyInstance } from 'fastify';
import z from 'zod';
import { roleHook } from '../../../../hooks/roleHook';
import { RoleEnum } from '../../../../../Types/Enum/RoleEnum';
import { dataFetchHook } from '../../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../../hooks/accessToWorkSpaceHook';

const routers: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceCategoriesRepo = f.repos.workSpaceCategoriesRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.post(
    '/',
    {
      schema: {
        body: z.object({
          value: z.string(),
          description: z.string().optional()
        })
      }
    },
    async (req) => {
      return await workSpaceCategoriesRepo.create(req.workSpace.id, {...req.body, creatorId: req.userData.id});
    }
  );

  f.post(
    '/add',
    {
      schema: {
        body: z.object({
          categoryId: z.string(),
          todoId: z.string()
        })
      }
    },
    async (req) => {
        return await workSpaceCategoriesRepo.attachTodo(req.body.todoId, req.body.categoryId, req.userData.id);
    }
  );

};

export default routers;