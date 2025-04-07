import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { FastifyInstance } from 'fastify';
import z from 'zod';
import { roleHook } from '../../../hooks/roleHook';
import { ERole } from '../../../../types/enum/ERole';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import { UUIDGetter } from '../../../common/schemas/UUIDGetter';
import { createWorkSpaceCategory } from '../../../../controllers/ws/categories/createWorkSpaceCategory';
import { deleteWorkSpaceCategory } from '../../../../controllers/ws/categories/deleteWorkSpaceCategory';
import { updateWorkSpaceCategory } from '../../../../controllers/ws/categories/updateWorkSpaceCategory';
import { permissionsAccessHook } from '../hooks/permissionsAccessHook';
import { Permissions } from '../../../../types/enum/EPermissions';

const routers: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceCategoriesRepo = f.repos.workSpaceCategoryRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.post(
    '/',
    {
      schema: {
        body: z.object({
          value: z.string(),
          description: z.string().optional(),
        }),
      },
      preHandler: permissionsAccessHook(Permissions.createCategory),
    },
    async (req) => {
      return await createWorkSpaceCategory(workSpaceCategoriesRepo, {
        workSpaceId: req.workSpace.id,
        creatorId: req.workSpace.workSpaceUserId,
        value: req.body.value,
        description: req.body.description,
      });
    },
  );

  f.delete(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
      },
      preHandler: permissionsAccessHook(Permissions.deleteCategory),
    },
    async (req) => {
      return await deleteWorkSpaceCategory(workSpaceCategoriesRepo, req.params.id);
    },
  );

  f.put(
    '/',
    {
      schema: {
        body: z.object({
          categoryId: z.string(),
          value: z.string(),
          description: z.string().optional(),
        }),
        preHandler: permissionsAccessHook(Permissions.changeCategory),
      },
    },
    async (req) => {
      return await updateWorkSpaceCategory(
        workSpaceCategoriesRepo,
        req.body.categoryId,
        req.body.value,
        req.body.description,
      );
    },
  );
};

export default routers;
