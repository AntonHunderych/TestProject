import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { FastifyInstance } from 'fastify';
import { RoleEnum } from '../../../../Types/Enum/RoleEnum';
import { roleHook } from '../../../hooks/roleHook';
import z from 'zod';
import { UUIDGetter } from '../../schemas/UUIDGetter';

const route: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>()
  const workSpacePermissionsRepo = f.repos.workSpacePermissionsRepo

  f.addHook("preHandler",roleHook([RoleEnum.ADMIN]));

  f.get(
    "/",
    {
      schema: {}
    },
    async () => {
      return  await workSpacePermissionsRepo.getAll()
    }
  )

  f.post(
    "/",
    {
      schema: {
        body: z.object({
          value: z.string(),
        })
      },
    },
    async (req) => {
      return await workSpacePermissionsRepo.create(req.body.value);
    }
  )

  f.delete(
    "/:id",
    {
      schema: {
        params: UUIDGetter
      }
    },
    async (req) => {
      return await workSpacePermissionsRepo.delete(req.params.id);
    }
  )

}

export default route;