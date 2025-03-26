import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../hooks/roleHook';
import z from 'zod';
import { createPermissionSchema } from './schema/createPermissionSchema';
import { getPermissionSchema } from './schema/getPermissionSchema';
import { UUIDGetter } from '../../schemas/UUIDGetter';
import { FastifyInstance } from 'fastify';
import { RoleEnum } from '../../../../types/enum/RoleEnum';

const route: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpacePermissionsRepo = f.repos.workSpacePermissionRepo;

  f.addHook('preHandler', roleHook([RoleEnum.ADMIN]));

  f.get(
    '/',
    {
      schema: {
        response: {
          200: z.array(getPermissionSchema),
        },
      },
    },
    async () => {
      return await workSpacePermissionsRepo.getAll();
    },
  );

  f.post(
    '/',
    {
      schema: {
        body: createPermissionSchema,
        response: {
          200: getPermissionSchema,
        },
      },
    },
    async (req) => {
      return await workSpacePermissionsRepo.create(req.body.value);
    },
  );

  f.delete(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: z.boolean(),
        },
      },
    },
    async (req) => {
      return await workSpacePermissionsRepo.delete(req.params.id);
    },
  );
};

export default route;
