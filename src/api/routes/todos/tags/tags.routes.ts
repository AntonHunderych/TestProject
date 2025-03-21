import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../hooks/roleHook';
import { RoleEnum } from '../../../../types/Enum/RoleEnum';
import z from 'zod';
import { getTagSchema } from './schema/getTagSchema';
import { createTagSchema } from './schema/createTagSchema';
import { addRemoveTagSchema } from './schema/addRemoveTagSchema';
import { UUIDGetter } from '../../schemas/UUIDGetter';

const routers: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const tagRepo = f.repos.tagRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));

  f.get(
    '/',
    {
      schema: {
        response: {
          200: z.array(getTagSchema)
        }
      }
    },
    async (req) => {
      return await tagRepo.getTags(req.userData.id);
    }
  );

  f.post(
    '/',
    {
      schema: {
        body: createTagSchema,
        response: {
          200: getTagSchema
        }
      }
    },
    async (req) => {
      return await tagRepo.createTag(req.userData.id, req.body.value);
    }
  );

  f.delete(
    '/:id',
    {
      schema: {
        params: UUIDGetter
      }
    },
    async (req) => {
      return await tagRepo.deleteTag(req.params.id);
    }
  );

  f.put(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        body: createTagSchema,
        response: {
          200: getTagSchema
        }
      }
    },
    async (req) => {
      return await tagRepo.updateTag(req.params.id, req.body.value);
    }
  );

  f.post(
    '/add',
    {
      schema: {
        body: addRemoveTagSchema,
      }
    },
    async (req) => {
      return await tagRepo.addTag(req.body.todoId, req.body.tagId);
    }
  );

  f.delete(
    '/remove',
    {
      schema: {
        body: addRemoveTagSchema
      }
    },
    async (req) => {
      return await tagRepo.removeTag(req.body.todoId, req.body.tagId);
    }
  );
};

export default routers;