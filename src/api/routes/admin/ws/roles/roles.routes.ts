import { accessToWorkSpaceHook } from '../../../ws/hooks/accessToWorkSpaceHook';
import { dataFetchHook } from '../../../ws/hooks/dataFetchHook';
import { RoleEnum } from '../../../../../types/enum/RoleEnum';
import { roleHook } from '../../../../hooks/roleHook';
import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { FastifyInstance } from 'fastify';
import { UUIDGetter } from '../../../../common/schemas/UUIDGetter';

const routes: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();

  const workSpaceRolesRepo = f.repos.workSpaceRoleRepo;
  const workSpaceUserRoleRepo = f.repos.workSpaceUserRoleRepo;

  f.addHook('preHandler', roleHook([RoleEnum.ADMIN]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.get(
    '/',
    {
      schema: {},
    },
    async () => {
      return await workSpaceRolesRepo.getAll();
    },
  );

  f.get(
    '/user/:id',
    {
      schema: {
        params: UUIDGetter,
      },
    },
    async (req) => {
      return await workSpaceUserRoleRepo.getAllUserRoles(req.params.id, req.workSpace.id);
    },
  );
};
export default routes;
