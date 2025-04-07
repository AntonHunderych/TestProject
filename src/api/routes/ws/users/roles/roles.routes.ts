import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { permissionsAccessHook } from '../../hooks/permissionsAccessHook';
import { Permissions } from '../../../../../types/enum/EPermissions';
import { roleHook } from '../../../../hooks/roleHook';
import { ERole } from '../../../../../types/enum/ERole';
import { dataFetchHook } from '../../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../../hooks/accessToWorkSpaceHook';
import { addDeleteRoleUserSchema } from './schema/addDeleteRoleUserSchema';
import { addRoleToUserByRoleId } from '../../../../../controllers/ws/roles/addRoleToUserByRoleId';
import { removeRoleFromUser } from '../../../../../controllers/ws/roles/removeRoleFromUser';

const routers: FastifyPluginAsyncZod = async function (fastify) {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const userRolesRepo = f.repos.workSpaceUserRoleRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.post(
    '/add',
    {
      schema: {
        body: addDeleteRoleUserSchema,
        preHandler: permissionsAccessHook(Permissions.assignRole),
      },
    },
    async (req) => {
      return await addRoleToUserByRoleId(userRolesRepo, req.body.userId, req.body.roleId);
    },
  );

  f.delete(
    '/remove',
    {
      schema: {
        body: addDeleteRoleUserSchema,
        preHandler: permissionsAccessHook(Permissions.revokeRole),
      },
    },
    async (req) => {
      return await removeRoleFromUser(userRolesRepo, req.body.userId, req.body.roleId);
    },
  );
};

export default routers;
