import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { FastifyInstance } from 'fastify';
import { roleHook } from '../../../hooks/roleHook';
import { RoleEnum } from '../../../../Types/Enum/RoleEnum';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { createRoleHandler } from '../../../../controllers/ws/roles/createRoleHandler';
import { createWorkSpaceRoleSchema } from './schema/createWorkSpaceRoleSchema';
import { getWorkSpaceRoleSchema } from './schema/getWorkSpaceRoleSchema';
import z from 'zod';
import { permissionsAccessHook } from '../hooks/permissionsAccessHook';
import { Permissions } from '../../../../Types/Enum/PermisionsEnum';
import { deleteWorkSpaceRoleSchema } from './schema/deleteWorkSpaceRoleSchema';

const routes: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();

  const workSpaceRolesRepo = f.repos.workSpaceRolesRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.get(
    '/admin/',
    {
      schema: {},
      preHandler: roleHook([RoleEnum.ADMIN]),
    },
    async () => {
      return await workSpaceRolesRepo.getAll();
    },
  );

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
    async (req, res) =>
      await createRoleHandler(workSpaceRolesRepo, req.workSpace.id, req.body.name, req.body.permissions, res),
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
      await workSpaceRolesRepo.updatePermissionOnRole(req.workSpace.id, req.body.name, req.body.permissions),
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
