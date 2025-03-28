import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../hooks/roleHook';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import z from 'zod';
import { getWorkSpaceRoleSchema } from './schema/getWorkSpaceRoleSchema';
import { createWorkSpaceRoleSchema } from './schema/createWorkSpaceRoleSchema';
import { permissionsAccessHook } from '../hooks/permissionsAccessHook';
import { createRoleHandler } from '../../../../controllers/ws/roles/createRoleHandler';
import { deleteWorkSpaceRoleSchema } from './schema/deleteWorkSpaceRoleSchema';
import { FastifyInstance } from 'fastify';
import { RoleEnum } from '../../../../types/enum/RoleEnum';
import { Permissions } from '../../../../types/enum/PermisionsEnum';
import { updatePermissionOnRole } from '../../../../controllers/ws/roles/updatePermissionOnRole';

const routes: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();

  const workSpaceRolesRepo = f.repos.workSpaceRoleRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.get(
    '/',
    {
      schema: {
        response: { 200: z.array(getWorkSpaceRoleSchema) },
      },
    },
    async (req) => await workSpaceRolesRepo.getWorkSpaceRoles(req.workSpace.id),
  );

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
        workSpaceRolesRepo,
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
        body: createWorkSpaceRoleSchema,
      },
      preHandler: permissionsAccessHook(Permissions.updateRole),
    },
    async (req) =>
      await updatePermissionOnRole(workSpaceRolesRepo, req.workSpace.id, req.body.name, req.body.permissions),
  );
  f.delete(
    '/',
    {
      schema: {
        response: { 200: z.boolean() },
        body: deleteWorkSpaceRoleSchema,
      },
      preHandler: permissionsAccessHook(Permissions.deleteRole),
    },
    async (req) => {
      return await workSpaceRolesRepo.delete(req.workSpace.id, req.body.name);
    },
  );
};
export default routes;
