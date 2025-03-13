import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { UUIDGetter } from '../../schemas/UUIDGetter';
import { dataFetchHook } from '../hooks/dataFetchHook';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();

  const workSpaceUserRepo = f.repos.workSpaceUserRepo;
  const workSpaceUserRoleRepo = f.repos.workSpaceUserRoleRepo;

  f.get(
    "/admin/roles/:id",
    {
      schema: {
        params: UUIDGetter,
      },
      preHandler: [dataFetchHook]
    },
    async (req) => {
      return await workSpaceUserRoleRepo.getAllUserRole(req.params.id,req.workSpace.id);
    }
  )

  f.get(
    '/workSpaces/',
    {
      schema: {},
    },
    async (req) => await workSpaceUserRepo.getUserAllWorkSpaces(req.userData.id),
  );

  f.get(
    '/workSpaces/created/',
    {
      schema: {},
    },
    async (req) => await workSpaceUserRepo.getAllCreatedWorkSpaces(req.userData.id),
  );

  f.post(
    '/addUser/',
    {
      schema: {
        body: z.object({
          userId: z.string(),
          workSpaceId: z.string(),
        }),
      },
    },
    async (req) => await workSpaceUserRepo.addUserToWorkSpace(req.body.workSpaceId, req.body.userId),
  );
};
export default routes;
