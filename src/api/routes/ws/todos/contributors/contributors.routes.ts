import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../../hooks/roleHook';
import { RoleEnum } from '../../../../../Types/Enum/RoleEnum';
import { dataFetchHook } from '../../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../../hooks/accessToWorkSpaceHook';
import { UUIDGetter } from '../../../schemas/UUIDGetter';
import z from 'zod';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const contributorRepos = f.repos.workSpaceContributorRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.get(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
      },
    },
    async (req) => {
      return await contributorRepos.getTodoContributor(req.workSpace.id, req.params.id);
    },
  );

  f.post(
    '/',
    {
      schema: {
        body: z.object({
          todoId: z.string(),
          userId: z.string(),
        }),
      },
    },
    async (req) => {
      await contributorRepos.addContributor(req.workSpace.id, req.body.userId, req.body.todoId);
    },
  );

  f.delete(
    '/',
    {
      schema: {
        body: z.object({
          todoId: z.string(),
          userId: z.string(),
        }),
      },
    },
    async (req) => {
      await contributorRepos.deleteContributor(req.workSpace.id, req.body.userId, req.body.todoId);
    },
  );
};

export default routes;
