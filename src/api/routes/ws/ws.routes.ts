import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { UUIDGetter } from '../../common/schemas/UUIDGetter';
import { createWorkSpaceSchema } from './schema/createWorkSpaceSchema';
import { accessToWorkSpaceHook, accessToWorkSpaceHookArgWorkSpaceId } from './hooks/accessToWorkSpaceHook';
import { roleHook } from '../../hooks/roleHook';
import { ERole } from '../../../types/enum/ERole';
import { startWorkSpaceSchema } from './schema/startWorkSpaceSchema';
import { stopWorkSpaceSchema } from './schema/stopWorkSpaceSchema';
import { createWorkSpaceProcess } from '../../../controllers/ws/createWorkSpaceProcess';
import { getWorkSpaceSchema } from './schema/getWorkSpaceSchema';
import { generateTokensThenGetAccessToken } from '../../../controllers/auth/generateTokensThenGetAccessToken';
import { permissionsAccessHook } from './hooks/permissionsAccessHook';
import { Permissions } from '../../../types/enum/EPermissions';
import { createWorkSpaceRespSchema } from './schema/createWorkSpaceSchemaRespSchema';
import { getWorkSpaceById } from '../../../controllers/ws/getWorkSpaceById';
import { getAccessWorkSpaceTokenSetRefresh } from '../../../controllers/ws/getAccessWorkSpaceTokenSetRefresh';
import { dataFetchHook } from './hooks/dataFetchHook';
import { deleteWorkSpaceProcess } from '../../../controllers/ws/deleteWorkSpaceProcess';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const tokenRepo = f.repos.tokenRepo;
  const workSpaceRepo = f.repos.workSpaceRepo;
  const workSpaceRoleRepo = f.repos.workSpaceRoleRepo;
  const workSpaceUserRepo = f.repos.workSpaceUserRepo;
  const workSpaceUserRoleRepo = f.repos.workSpaceUserRoleRepo;
  const workSpaceRolePermission = f.repos.workSpaceRolePermissionRepo;
  const workSpaceGoogleCalendarTokenRepo = f.repos.workSpaceGoogleCalendarTokenRepo;
  const workSpaceTodoRepo = f.repos.workSpaceTodoRepo;
  const userLimitRepo = f.repos.userLimitRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));

  f.get(
    '/start/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: startWorkSpaceSchema,
        },
      },
      preHandler: [(req, reply) => accessToWorkSpaceHookArgWorkSpaceId(req.params.id).bind(f)(req, reply)],
    },
    async (req, reply) => {
      return await getAccessWorkSpaceTokenSetRefresh(
        { ...req.userData },
        req.params.id,
        workSpaceUserRepo,
        f.jwt,
        tokenRepo,
        reply,
      );
    },
  );

  f.delete(
    '/stop/',
    {
      schema: {
        response: {
          200: stopWorkSpaceSchema,
        },
      },
    },
    async (req, reply) => {
      return {
        casualToken: await generateTokensThenGetAccessToken({ ...req.userData }, f.jwt, tokenRepo, reply),
      };
    },
  );

  f.get(
    '/',
    {
      schema: {
        response: {
          200: getWorkSpaceSchema,
        },
      },
      preHandler: [dataFetchHook, accessToWorkSpaceHook],
    },
    async (req) => {
      return await getWorkSpaceById(workSpaceRepo, req.workSpace.id);
    },
  );

  f.post(
    '/',
    {
      schema: {
        body: createWorkSpaceSchema,
        response: {
          200: createWorkSpaceRespSchema,
        },
      },
    },
    async (req) => {
      return await createWorkSpaceProcess(
        f.withTransaction,
        userLimitRepo,
        workSpaceRepo,
        workSpaceUserRepo,
        workSpaceRoleRepo,
        workSpaceUserRoleRepo,
        workSpaceRolePermission,
        req.body,
        req.userData.id,
      );
    },
  );

  f.delete(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
      },
      preHandler: [dataFetchHook, permissionsAccessHook(Permissions.deleteWorkSpace), accessToWorkSpaceHook],
    },
    async (req) => {
      return await deleteWorkSpaceProcess(
        f.withTransaction,
        workSpaceRepo,
        req.params.id,
        workSpaceGoogleCalendarTokenRepo,
        f.calendar,
        f.getOAuth2Client,
        workSpaceTodoRepo,
        f.notification,
        userLimitRepo,
        req.userData.id,
      );
    },
  );
};

export default routes;
