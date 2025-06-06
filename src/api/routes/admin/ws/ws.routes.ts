import { UUIDGetter } from '../../../common/schemas/UUIDGetter';
import { roleHook } from '../../../hooks/roleHook';
import { ERole } from '../../../../types/enum/ERole';
import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceRepo = f.repos.workSpaceRepo;

  f.addHook('preHandler', roleHook([ERole.ADMIN]));

  f.get(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
      },
    },
    async (req) => {
      return await workSpaceRepo.getWorkSpaceById(req.params.id);
    },
  );
};

export default routes;
