import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../hooks/roleHook';
import { ERole } from '../../../../types/enum/ERole';
import z from 'zod';
import { getTagSchema } from './schema/getTagSchema';
import { createTagSchema } from './schema/createTagSchema';
import { addRemoveTagSchema } from './schema/addRemoveTagSchema';
import { UUIDGetter } from '../../../common/schemas/UUIDGetter';
import { getTags } from '../../../../controllers/tags/getTags';
import { createTag } from '../../../../controllers/tags/createTag';
import { deleteTag } from '../../../../controllers/tags/deleteTag';
import { updateTag } from '../../../../controllers/tags/updateTag';
import { addTagToTodo } from '../../../../controllers/tags/addTagToTodo';
import { removeTagFromTodo } from '../../../../controllers/tags/removeTagFromTodo';

const routers: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const tagRepo = f.repos.tagRepo;
  const todoTagRepo = f.repos.todoTagRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));

  f.get(
    '/',
    {
      schema: {
        response: {
          200: z.array(getTagSchema),
        },
      },
    },
    async (req) => {
      return await getTags(tagRepo, req.userData.id);
    },
  );

  f.post(
    '/',
    {
      schema: {
        body: createTagSchema,
        response: {
          200: getTagSchema,
        },
      },
    },
    async (req) => {
      return await createTag(tagRepo, req.userData.id, req.body.value);
    },
  );

  f.delete(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
      },
    },
    async (req) => {
      return await deleteTag(tagRepo, req.params.id);
    },
  );

  f.put(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        body: createTagSchema,
        response: {
          200: getTagSchema,
        },
      },
    },
    async (req) => {
      return await updateTag(tagRepo, req.params.id, req.body.value);
    },
  );

  f.post(
    '/add',
    {
      schema: {
        body: addRemoveTagSchema,
      },
    },
    async (req) => {
      return await addTagToTodo(todoTagRepo, req.body.tagId, req.body.todoId);
    },
  );

  f.delete(
    '/remove',
    {
      schema: {
        body: addRemoveTagSchema,
      },
    },
    async (req) => {
      return await removeTagFromTodo(todoTagRepo, req.body.tagId, req.body.todoId);
    },
  );
};

export default routers;
