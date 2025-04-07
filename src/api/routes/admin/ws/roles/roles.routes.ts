import { accessToWorkSpaceHook } from '../../../ws/hooks/accessToWorkSpaceHook';
import { dataFetchHook } from '../../../ws/hooks/dataFetchHook';
import { ERole } from '../../../../../types/enum/ERole';
import { roleHook } from '../../../../hooks/roleHook';
import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { FastifyInstance } from 'fastify';
import { UUIDGetter } from '../../../../common/schemas/UUIDGetter';

const routes: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();

  const workSpaceUserRoleRepo = f.repos.workSpaceUserRoleRepo;

  f.addHook('preHandler', roleHook([ERole.ADMIN]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.get(
    '/user/:id',
    {
      schema: {
        params: UUIDGetter,
      },
    },
    async (req) => {
      return await workSpaceUserRoleRepo.getAllUserRoles(req.params.id);
    },
  );
};
export default routes;
