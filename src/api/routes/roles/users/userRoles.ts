import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

const routes: FastifyPluginAsyncZod = async (f) => {
  const userRoleRepo = f.repos.userRoleRepo;

  f.post(
    '/:id',
    {
      schema: {
        params: z.object({ id: z.string() }),
        body: z.object({
          roleValue: z.string(),
        }),
      },
    },
    async (req) => {
      return await userRoleRepo.giveRoleToUser(req.params.id, req.body.roleValue);
    },
  );

  f.delete(
    '/:id',
    {
      schema: {
        params: z.object({ id: z.string() }),
        body: z.object({
          roleValue: z.string(),
        }),
      },
    },
    async (req) => {
      return await userRoleRepo.removeRoleFromUser(req.params.id, req.body.roleValue);
    },
  );
};

export default routes;
