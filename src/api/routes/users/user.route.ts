import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import getUserById from '../../../controllers/users/getUser';
import { roleHook } from '../../hooks/roleHook';
import { ERole } from '../../../types/enum/ERole';
import { getUserDataSchema } from './schemas/getUserDataSchema';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const userRepo = f.repos.userRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));

  f.get(
    '/me',
    {
      schema: {
        response: {
          200: getUserDataSchema,
        },
      },
    },
    async (req) => await getUserById(userRepo, req.userData.id),
  );
};

export default routes;
