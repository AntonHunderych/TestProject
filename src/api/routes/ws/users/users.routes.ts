import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { UUIDGetter } from '../../../common/schemas/UUIDGetter';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { roleHook } from '../../../hooks/roleHook';
import { ERole } from '../../../../types/enum/ERole';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import { getWorkSpaceUserSchema } from './schema/getWorkSpaceUserSchema';
import { getUsersInWorkSpaceHandler } from '../../../../controllers/ws/users/getUsersInWorkSpace';
import { permissionsAccessHook } from '../hooks/permissionsAccessHook';
import { Permissions } from '../../../../types/enum/EPermissions';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();

  const workSpaceUserRepo = f.repos.workSpaceUserRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.get(
    '/',
    {
      schema: {
        response: {
          200: z.array(getWorkSpaceUserSchema),
        },
      },
    },
    async (req) => {
      return await getUsersInWorkSpaceHandler(workSpaceUserRepo, req.workSpace.id);
    },
  );

  f.post(
    '/add/:id',
    {
      schema: {
        params: UUIDGetter,
      },
      preHandler: permissionsAccessHook(Permissions.addUserToWorkSpace),
    },
    async (req) => await workSpaceUserRepo.addUserToWorkSpace(req.workSpace.id, req.params.id),
  );

  f.delete(
    '/remove/:id',
    {
      schema: {
        params: UUIDGetter,
      },
      preHandler: permissionsAccessHook(Permissions.deleteUserFromWorkSpace),
    },
    async (req) => {
      return await workSpaceUserRepo.deleteUserFromWorkSpace(req.workSpace.id, req.params.id);
    },
  );
};
export default routes;
