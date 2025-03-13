import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';

const routers: FastifyPluginAsyncZod = async function (fastify) {

  const f = fastify.withTypeProvider<ZodTypeProvider>()
  const userRolesRepo = f.repos.workSpaceUserRoleRepo

  f.post(
    "/",
    {
      schema:{
        body: z.object({
          userId: z.string(),
          roleValue: z.string()
        })
      }
    },
    async (req) => {
      return await userRolesRepo.giveRoleToUser(req.body.userId, req.workSpace.id, req.body.roleValue);
    }
  )
}

export default routers;