import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../hooks/roleHook';
import { UUIDGetter } from '../../schemas/UUIDGetter';
import z from 'zod';
import { getTodoCommentsHandler } from '../../../../controllers/comments/getTodoCommentsHandler';
import { createCommentHandler } from '../../../../controllers/comments/createComment';
import { deleteCommentHandler } from '../../../../controllers/comments/deleteCommentHandler';
import { updateCommentHandler } from '../../../../controllers/comments/updateCommentHandler';
import { getCommentSchema } from './schemas/getCommentSchema';
import { updateCommentSchema } from './schemas/updateCommentSchema';
import { createCommentSchema } from './schemas/createCommentSchema';
import { RoleEnum } from '../../../../Types/Enum/RoleEnum';

export const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>()
  const commentsRepo = fastify.repos.commentRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));

  f.get(
    "/admin/",
    {
      schema: {
        response:{
          200: z.array(getCommentSchema)
        }
      },
      preHandler: roleHook([RoleEnum.ADMIN])
    },
    async () => {
      return await commentsRepo.getAllComments()
    }
  )

  f.get(
    "/admin/:id",
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: getCommentSchema
        },
        preHandler: roleHook([RoleEnum.ADMIN])
      }
    },
    async (req) => {
      return await commentsRepo.getCommentById(req.params.id)
    }
  )

  f.get(
    "/:todoID",
    {
      schema:{
        params: UUIDGetter,
        response: {
          200: z.array(getCommentSchema)
        }
      }
    },
    async (req) => await getTodoCommentsHandler(commentsRepo,req.params.id)
  )

  f.post(
    "/",
    {
      schema: {
        body: createCommentSchema,
        response: {
          200: getCommentSchema
        }
      },
    },
    async (req) => {
      const userData = f.getUserDataFromJWT(req)
      return  await createCommentHandler(commentsRepo,{...req.body,authorId: userData.id})
    }
  )

  f.delete(
    "/:id",
    {
      schema:{
        params: UUIDGetter,
        response: {
          200: z.boolean()
        }
      }
    },
    async (req) => await deleteCommentHandler(commentsRepo,req.params.id)
  )

  f.put(
    "/:id",
    {
      schema: {
        params: UUIDGetter,
        body: updateCommentSchema,
        response: {
          200: getCommentSchema
        }
      }
    },
    async (req) => await updateCommentHandler(commentsRepo,req.params.id,req.body)
  )
}

export default routes;