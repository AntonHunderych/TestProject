import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../../hooks/roleHook';
import { RoleEnum } from '../../../../../types/enum/RoleEnum';
import { dataFetchHook } from '../../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../../hooks/accessToWorkSpaceHook';
import { UUIDGetter } from '../../../../common/schemas/UUIDGetter';
import z from 'zod';
import { permissionsAccessHook } from '../../hooks/permissionsAccessHook';
import { Permissions } from '../../../../../types/enum/PermisionsEnum';
import { getWorkSpaceCommentSchema } from './schema/getWorkSpaceCommentSchema';
import { createWorkSpaceCommentSchema } from './schema/createWorkSpaceCommentSchema';
import { updateWorkSpaceCommentSchema } from './schema/updateWorkSpaceCommentSchema';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceCommentRepos = f.repos.workSpaceCommentRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.get(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: z.array(getWorkSpaceCommentSchema),
        },
      },
    },
    async (req) => {
      return await workSpaceCommentRepos.getCommentsByTodoId(req.params.id);
    },
  );

  f.post(
    '/',
    {
      schema: {
        body: createWorkSpaceCommentSchema,
        response: {
          200: getWorkSpaceCommentSchema,
        },
      },
      preHandler: permissionsAccessHook(Permissions.writeComment),
    },
    async (req) => {
      return await workSpaceCommentRepos.createComment({
        text: req.body.comment,
        todoId: req.body.todoId,
        authorId: req.userData.id,
        workSpaceId: req.workSpace.id,
      });
    },
  );

  f.delete(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
      },
      preHandler: permissionsAccessHook(Permissions.deleteComment),
    },
    async (req) => {
      await workSpaceCommentRepos.deleteComment(req.params.id);
    },
  );

  f.put(
    '/',
    {
      schema: {
        body: updateWorkSpaceCommentSchema,
        response: {
          200: getWorkSpaceCommentSchema,
        },
      },
      preHandler: permissionsAccessHook(Permissions.changeComment),
    },
    async (req) => {
      return await workSpaceCommentRepos.updateComment(req.body.id, { text: req.body.comment });
    },
  );
};

export default routes;
