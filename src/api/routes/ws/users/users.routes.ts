import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { UUIDGetter } from '../../../common/schemas/UUIDGetter';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { roleHook } from '../../../hooks/roleHook';
import { RoleEnum } from '../../../../types/enum/RoleEnum';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import { getWorkSpaceSchema } from '../schema/getWorkSpaceSchema';
import { getWorkSpaceUserSchema } from './schema/getWorkSpaceUserSchema';
import { getUsersInWorkSpaceHandler } from '../../../../controllers/ws/users/getUsersInWorkSpace';
import { permissionsAccessHook } from '../hooks/permissionsAccessHook';
import { Permissions } from '../../../../types/enum/PermisionsEnum';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();

  const workSpaceUserRepo = f.repos.workSpaceUserRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.get(
    '/workSpaces/',
    {
      schema: {
        response: {
          200: z.array(getWorkSpaceSchema),
        },
      },
    },
    async (req) => await workSpaceUserRepo.getUserAllWorkSpaces(req.userData.id),
  );

  f.get(
    '/workSpaces/created/',
    {
      schema: {
        response: {
          200: z.array(getWorkSpaceSchema),
        },
      },
    },
    async (req) => await workSpaceUserRepo.getAllCreatedWorkSpaces(req.userData.id),
  );

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
    '/addUser/',
    {
      schema: {
        body: z.object({
          userId: z.string(),
          workSpaceId: z.string(),
        }),
      },
      preHandler: permissionsAccessHook(Permissions.addUserToWorkSpace),
    },
    async (req) => await workSpaceUserRepo.addUserToWorkSpace(req.body.workSpaceId, req.body.userId),
  );

  f.delete(
    '/deleteUser/:id',
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
