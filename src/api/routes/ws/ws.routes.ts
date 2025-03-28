import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { UUIDGetter } from '../../common/schemas/UUIDGetter';
import { createWorkSpaceSchema } from './schema/createWorkSpaceSchema';
import { accessToWorkSpaceHookArgWorkSpaceId } from './hooks/accessToWorkSpaceHook';
import { roleHook } from '../../hooks/roleHook';
import { RoleEnum } from '../../../types/enum/RoleEnum';
import { startWorkSpaceSchema } from './schema/startWorkSpaceSchema';
import { stopWorkSpaceSchema } from './schema/stopWorkSpaceSchema';
import { createWorkSpaceProcess } from '../../../controllers/ws/createWorkSpaceProcess';
import { getWorkSpaceSchema } from './schema/getWorkSpaceSchema';
import { generateTokensThenGetAccessToken } from '../../../controllers/auth/generateTokensThenGetAccessToken';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const tokenRepo = f.repos.tokenRepo;
  const workSpaceRepo = f.repos.workSpaceRepo;
  const workSpaceRoleRepo = f.repos.workSpaceRoleRepo;
  const workSpaceUserRepo = f.repos.workSpaceUserRepo;
  const workSpaceUserRoleRepo = f.repos.workSpaceUserRoleRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));

  f.get(
    '/admin/:id',
    {
      schema: {
        params: UUIDGetter,
      },
      preHandler: roleHook([RoleEnum.USER]),
    },
    async (req) => {
      return await workSpaceRepo.getWorkSpaceById(req.params.id);
    },
  );

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
      return {
        workSpaceAccessToken: await generateTokensThenGetAccessToken(
          { ...req.userData, workSpaceId: req.params.id },
          f.jwt,
          tokenRepo,
          reply,
        ),
      };
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

  f.post(
    '/',
    {
      schema: {
        body: createWorkSpaceSchema,
        response: {
          200: getWorkSpaceSchema,
        },
      },
    },
    async (req) => {
      return await createWorkSpaceProcess(
        workSpaceRepo,
        workSpaceUserRepo,
        workSpaceRoleRepo,
        workSpaceUserRoleRepo,
        req.body,
        req.userData.id,
      );
    },
  );
};

export default routes;
