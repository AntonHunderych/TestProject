import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { FastifyInstance } from 'fastify';
import { roleHook } from '../../../../hooks/roleHook';
import { dataFetchHook } from '../../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../../hooks/accessToWorkSpaceHook';
import { UUIDGetter } from '../../../../common/schemas/UUIDGetter';
import { ERole } from '../../../../../types/enum/ERole';
import { addCategoryTodo } from './schema/addCategoryTodo';
import { removeWorkSpaceCategory } from '../../../../../controllers/ws/categories/removeWorkSpaceCategoryFromTodo';
import { setWorkSpaceCategoryToTodo } from '../../../../../controllers/ws/categories/setWorkSpaceCategoryToTodo';

const routers: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceTodoRepo = f.repos.workSpaceTodoRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);
  f.post(
    '/add',
    {
      schema: {
        body: addCategoryTodo,
      },
    },
    async (req) => {
      return await setWorkSpaceCategoryToTodo(
        workSpaceTodoRepo,
        req.body.todoId,
        req.body.categoryId,
        req.workSpace.workSpaceUserId,
      );
    },
  );

  f.delete(
    '/remove/:id',
    {
      schema: {
        params: UUIDGetter,
      },
    },
    async (req) => {
      return await removeWorkSpaceCategory(workSpaceTodoRepo, req.params.id);
    },
  );
};

export default routers;
