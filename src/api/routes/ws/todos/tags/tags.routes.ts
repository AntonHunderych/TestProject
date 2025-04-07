import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../../hooks/roleHook';
import { ERole } from '../../../../../types/enum/ERole';
import { dataFetchHook } from '../../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../../hooks/accessToWorkSpaceHook';
import { addRemoveWorkSpaceTagSchema } from './schema/addRemoveWorkSpaceTagSchema';
import { addTagToTodo } from '../../../../../controllers/ws/tags/addTagToTodo';
import { removeWorkSpaceTagFromTodo } from '../../../../../controllers/ws/tags/removeTagFromTodo';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceTagTodoRepo = f.repos.workSpaceTagTodoRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.post(
    '/add',
    {
      schema: {
        body: addRemoveWorkSpaceTagSchema,
      },
    },
    async (req) => {
      return await addTagToTodo(workSpaceTagTodoRepo, req.body.todoId, req.body.tagId, req.workSpace.workSpaceUserId);
    },
  );

  f.delete(
    '/remove',
    {
      schema: {
        body: addRemoveWorkSpaceTagSchema,
      },
    },
    async (req) => {
      return await removeWorkSpaceTagFromTodo(workSpaceTagTodoRepo, req.body.todoId, req.body.tagId);
    },
  );
};

export default routes;
