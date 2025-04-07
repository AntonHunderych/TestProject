import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { skipAuthHook } from '../../../../hooks/skipAuthHook';
import { addUserToWorkSpaceFromInvite } from '../../../../../controllers/ws/users/addUserToWorkSpaceFromInvite';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();

  const workSpaceUserRepo = f.repos.workSpaceUserRepo;
  const workSpaceInviteLinkRepo = f.repos.workSpaceInviteLinkRepo;
  const workSpaceRoleRepo = f.repos.workSpaceRoleRepo;
  const workSpaceUserRoleRepo = f.repos.workSpaceUserRoleRepo;

  f.get(
    '',
    {
      schema: {
        querystring: z.object({ token: z.string() }),
      },
      preValidation: skipAuthHook,
    },
    async (req) => {
      return await addUserToWorkSpaceFromInvite(
        f.withTransaction,
        workSpaceRoleRepo,
        workSpaceUserRoleRepo,
        workSpaceUserRepo,
        workSpaceInviteLinkRepo,
        f.crypto,
        req.query.token,
      );
    },
  );
};
export default routes;
