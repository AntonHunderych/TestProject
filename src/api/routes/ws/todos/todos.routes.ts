import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { createTodoSchema } from './schema/createTodoSchema';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const wsTodoRepo = f.repos.workSpaceTodoRepo;

  f.post(
    '/',
    {
      schema: {
        body: createTodoSchema,
      },
    },
    async (req) => {
      return await wsTodoRepo.create({ ...req.body, creatorId: req.userData.id });
    },
  );
};
export default routes;
