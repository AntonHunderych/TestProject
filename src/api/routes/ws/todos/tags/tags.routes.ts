import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { roleHook } from '../../../../hooks/roleHook';
import { RoleEnum } from '../../../../../types/enum/RoleEnum';
import { dataFetchHook } from '../../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../../hooks/accessToWorkSpaceHook';
import { getTagSchema } from '../../../todos/tags/schema/getTagSchema';
import { createTagSchema } from '../../../todos/tags/schema/createTagSchema';
import { UUIDGetter } from '../../../../common/schemas/UUIDGetter';
import { addRemoveTagSchema } from '../../../todos/tags/schema/addRemoveTagSchema';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceTagRepo = f.repos.workSpaceTagRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

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
      return await workSpaceTagRepo.getTags(req.workSpace.id);
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
      return await workSpaceTagRepo.createTag(req.workSpace.id, req.userData.id, req.body.value);
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
      return await workSpaceTagRepo.deleteTag(req.params.id);
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
      return await workSpaceTagRepo.updateTag(req.params.id, req.body.value);
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
      return await workSpaceTagRepo.addTag(req.body.todoId, req.body.tagId, req.userData.id, req.workSpace.id);
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
      return await workSpaceTagRepo.removeTag(req.body.todoId, req.body.tagId);
    },
  );
};

export default routes;
