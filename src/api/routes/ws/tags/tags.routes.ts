import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../hooks/roleHook';
import { ERole } from '../../../../types/enum/ERole';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import { UUIDGetter } from '../../../common/schemas/UUIDGetter';
import { createTag } from '../../../../controllers/ws/tags/createTag';
import { updateTag } from '../../../../controllers/ws/tags/updateTag';
import { deleteTag } from '../../../../controllers/ws/tags/deleteTag';
import { getWorkSpaceTagSchema } from './schema/getWorkSpaceTagSchema';
import { createWorkSpaceTagSchema } from './schema/createWorkSpaceTagShema';
import { updateWorkSpaceTagSchema } from './schema/updateWorkSpaceTagSchema';
import { permissionsAccessHook } from '../hooks/permissionsAccessHook';
import { Permissions } from '../../../../types/enum/EPermissions';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceTagRepo = f.repos.workSpaceTagRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.post(
    '/',
    {
      schema: {
        body: createWorkSpaceTagSchema,
        response: {
          200: getWorkSpaceTagSchema,
        },
      },
      preHandler: permissionsAccessHook(Permissions.createTag),
    },
    async (req) => {
      return await createTag(workSpaceTagRepo, req.workSpace.id, req.workSpace.workSpaceUserId, req.body.value);
    },
  );

  f.delete(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
      },
      preHandler: permissionsAccessHook(Permissions.deleteTag),
    },
    async (req) => {
      return await deleteTag(workSpaceTagRepo, req.params.id);
    },
  );

  f.put(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        body: updateWorkSpaceTagSchema,
        response: {
          200: getWorkSpaceTagSchema,
        },
      },
      preHandler: permissionsAccessHook(Permissions.changeTag),
    },
    async (req) => {
      return await updateTag(workSpaceTagRepo, req.params.id, req.body.value);
    },
  );
};

export default routes;
