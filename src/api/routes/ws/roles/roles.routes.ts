import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../hooks/roleHook';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import z from 'zod';
import { getWorkSpaceRoleSchema } from './schema/getWorkSpaceRoleSchema';
import { createWorkSpaceRoleSchema } from './schema/createWorkSpaceRoleSchema';
import { permissionsAccessHook } from '../hooks/permissionsAccessHook';
import { createRoleHandler } from '../../../../controllers/ws/roles/createRoleHandler';
import { FastifyInstance } from 'fastify';
import { RoleEnum } from '../../../../types/enum/RoleEnum';
import { Permissions } from '../../../../types/enum/PermisionsEnum';
import { updatePermissionsOnRole } from './schema/updatePermissionsOnRole';
import { updatePermissionOnRole } from '../../../../controllers/ws/roles/updatePermissionsOnRole';
import { deleteRole } from '../../../../controllers/ws/roles/deleteRole';
import { UUIDGetter } from '../../../common/schemas/UUIDGetter';

const routes: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();

  const workSpaceRoleRepo = f.repos.workSpaceRoleRepo;
  const workSpaceRolesPermissionsRepo = f.repos.workSpaceRolePermissionRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.post(
    '/',
    {
      schema: {
        response: { 200: getWorkSpaceRoleSchema },
        body: createWorkSpaceRoleSchema,
      },
      preHandler: permissionsAccessHook(Permissions.createRole),
    },
    async (req) =>
      await createRoleHandler(
        f.withTransaction,
        workSpaceRoleRepo,
        workSpaceRolesPermissionsRepo,
        req.workSpace.id,
        req.body.name,
        req.body.permissions,
      ),
  );
  f.put(
    '/',
    {
      schema: {
        response: { 200: getWorkSpaceRoleSchema },
        body: updatePermissionsOnRole,
      },
      preHandler: permissionsAccessHook(Permissions.updateRole),
    },
    async (req) =>
      await updatePermissionOnRole(
        workSpaceRolesPermissionsRepo,
        req.body.roleId,
        req.body.permissions,
        f.withTransaction,
      ),
  );
  f.delete(
    '/',
    {
      schema: {
        response: { 200: z.boolean() },
        params: UUIDGetter,
      },
      preHandler: permissionsAccessHook(Permissions.deleteRole),
    },
    async (req) => {
      return await deleteRole(workSpaceRoleRepo, req.params.id);
    },
  );
};
export default routes;
