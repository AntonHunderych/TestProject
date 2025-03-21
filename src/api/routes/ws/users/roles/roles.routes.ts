import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { permissionsAccessHook } from '../../hooks/permissionsAccessHook';
import { Permissions } from '../../../../../types/Enum/PermisionsEnum';
import { roleHook } from '../../../../hooks/roleHook';
import { RoleEnum } from '../../../../../types/Enum/RoleEnum';
import { dataFetchHook } from '../../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../../hooks/accessToWorkSpaceHook';
import { addDeleteRoleUserSchema } from './schema/addDeleteRoleUserSchema';
import { addWorkSpaceRoleToUser } from '../../../../../controllers/ws/roles/giveWorkSpaceRoleToUser';

const routers: FastifyPluginAsyncZod = async function (fastify) {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const userRolesRepo = f.repos.workSpaceUserRoleRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.post(
    '/',
    {
      schema: {
        body: addDeleteRoleUserSchema,
        preHandler: permissionsAccessHook(Permissions.assignRole),
      },
    },
    async (req) => {
      return await addWorkSpaceRoleToUser(userRolesRepo, req.body.userId, req.workSpace.id, req.body.roleValue);
    },
  );

  f.delete(
    '/',
    {
      schema: {
        body: addDeleteRoleUserSchema,
        preHandler: permissionsAccessHook(Permissions.revokeRole),
      },
    },
    async (req) => {
      return await userRolesRepo.removeRoleFromUser(req.body.userId, req.workSpace.id, req.body.roleValue);
    },
  );
};

export default routers;
