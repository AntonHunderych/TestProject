import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { roleHook } from '../../hooks/roleHook';
import { RoleEnum } from '../../../types/Enum/RoleEnum';
import { createRoleSchema } from './schemas/createRoleShema';
import { valueRoleGetter } from './schemas/valueRoleGetter';
import { getRoleSchema } from './schemas/getRoleSchema';
import { getAllRoles } from '../../../controllers/roles/getAllRole';
import { getRoleByValue } from '../../../controllers/roles/getRoleByValue';
import { createRole } from '../../../controllers/roles/createRole';
import { deleteRole } from '../../../controllers/roles/deleteRole';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const roleRepo = f.repos.roleRepo;

  f.addHook('preHandler', roleHook([RoleEnum.ADMIN]));

  f.get(
    '/',
    {
      schema: {
        response: {
          200: z.array(getRoleSchema),
        },
      },
    },
    async () => {
      return await getAllRoles(roleRepo);
    },
  );

  f.get(
    '/:value',
    {
      schema: {
        params: valueRoleGetter,
        response: {
          200: getRoleSchema,
        },
      },
    },
    async (req) => {
      return await getRoleByValue(roleRepo, req.params.value);
    },
  );

  f.post(
    '/:value',
    {
      schema: {
        body: createRoleSchema,
        response: {
          200: getRoleSchema,
        },
      },
    },
    async (req) => {
      return await createRole(roleRepo, req.body);
    },
  );

  f.delete(
    '/:value',
    {
      schema: {
        params: valueRoleGetter,
        response: {
          200: z.boolean(),
        },
      },
    },
    async (req) => {
      return await deleteRole(roleRepo, req.params.value);
    },
  );
};

export default routes;
