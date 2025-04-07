import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../../hooks/roleHook';
import { ERole } from '../../../../../types/enum/ERole';
import { dataFetchHook } from '../../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../../hooks/accessToWorkSpaceHook';
import { UUIDGetter } from '../../../../common/schemas/UUIDGetter';
import { addDeleteContributorSchema } from './schema/addDeleteContributorSchema';
import { permissionsAccessHook } from '../../hooks/permissionsAccessHook';
import { Permissions } from '../../../../../types/enum/EPermissions';
import { addContributors } from '../../../../../controllers/ws/contributors/addContributors';
import { deleteContributor } from '../../../../../controllers/ws/contributors/deleteContributors';
import { getTodoContributor } from '../../../../../controllers/ws/contributors/getTodoContributor';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const contributorRepos = f.repos.workSpaceContributorRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));
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
      return await getTodoContributor(contributorRepos, req.params.id);
    },
  );

  f.post(
    '/',
    {
      schema: {
        body: addDeleteContributorSchema,
      },
      preHandler: permissionsAccessHook(Permissions.addPerformersTodo),
    },
    async (req) => {
      await addContributors(contributorRepos, req.body.userId, req.body.todoId);
    },
  );

  f.delete(
    '/',
    {
      schema: {
        body: addDeleteContributorSchema,
      },
      preHandler: permissionsAccessHook(Permissions.removePerformersTodo),
    },
    async (req) => {
      await deleteContributor(contributorRepos, req.body.userId, req.body.todoId);
    },
  );
};

export default routes;
