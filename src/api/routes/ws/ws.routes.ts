import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { UUIDGetter } from '../schemas/UUIDGetter';
import { createWorkSpaceSchema } from './schema/createWorkSpaceSchema';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>()
  const workSpaceRepo = f.repos.workSpaceRepo
  const workSpaceUser = f.repos.workSpaceUserRepo

  f.get(
    "/start/:id",
    {
      schema: {
        params: UUIDGetter
      }
    },
    async (req) =>{
      return f.jwt.sign({
        ...req.userData,
        workSpaceId: req.params.id,
        userIdInWorkSpace: 1
      })
    }
  )

  f.post(
    "/",
    {
      schema: {
        body: createWorkSpaceSchema
      }
    },
    async (req) =>{
      const workSpace =  await workSpaceRepo.createWorkSpace({...req.body,creatorId: req.userData.id})
      await workSpaceUser.addUserToWorkSpace(workSpace.id, req.userData.id)
      return workSpace
    }
  )

}

export default routes;