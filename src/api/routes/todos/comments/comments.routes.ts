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
import { RoleEnum } from '../../../../types/enum/RoleEnum';
import { roleHook } from '../../../hooks/roleHook';
import { getAllComments } from '../../../../controllers/comments/getAllComment';
import { getCommentById } from '../../../../controllers/comments/getCommentById';

export const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const commentsRepo = fastify.repos.commentRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));

  f.get(
    '/admin/',
    {
      schema: {
        response: {
          200: z.array(getCommentSchema),
        },
      },
      preHandler: roleHook([RoleEnum.ADMIN]),
    },
    async () => {
      return await getAllComments(commentsRepo);
    },
  );

  f.get(
    '/admin/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: getCommentSchema,
        },
        preHandler: roleHook([RoleEnum.ADMIN]),
      },
    },
    async (req) => {
      return await getCommentById(commentsRepo, req.params.id);
    },
  );

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
