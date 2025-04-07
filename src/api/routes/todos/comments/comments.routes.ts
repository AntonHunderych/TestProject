import { UUIDGetter } from '../../../common/schemas/UUIDGetter';
import z from 'zod';
import { getTodoComments } from '../../../../controllers/comments/getTodoComments';
import { createCommentSchema } from './schemas/createCommentSchema';
import { getCommentSchema } from './schemas/getCommentSchema';
import { createComment } from '../../../../controllers/comments/createComment';
import { deleteComment } from '../../../../controllers/comments/deleteComment';
import { updateCommentSchema } from './schemas/updateCommentSchema';
import { updateComment } from '../../../../controllers/comments/updateComment';
import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { ERole } from '../../../../types/enum/ERole';
import { roleHook } from '../../../hooks/roleHook';

export const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const commentsRepo = fastify.repos.commentRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));

  f.get(
    '/:todoID',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: z.array(getCommentSchema),
        },
      },
    },
    async (req) => await getTodoComments(commentsRepo, req.params.id),
  );

  f.post(
    '/',
    {
      schema: {
        body: createCommentSchema,
        response: {
          200: getCommentSchema,
        },
      },
    },
    async (req) => {
      return await createComment(commentsRepo, { ...req.body, authorId: req.userData.id });
    },
  );

  f.delete(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: z.boolean(),
        },
      },
    },
    async (req) => await deleteComment(commentsRepo, req.params.id),
  );

  f.put(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        body: updateCommentSchema,
        response: {
          200: getCommentSchema,
        },
      },
    },
    async (req) => await updateComment(commentsRepo, req.params.id, req.body),
  );
};

export default routes;
