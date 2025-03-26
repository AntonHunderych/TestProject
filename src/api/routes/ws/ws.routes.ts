import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { UUIDGetter } from '../schemas/UUIDGetter';
import { createWorkSpaceSchema } from './schema/createWorkSpaceSchema';
import { accessToWorkSpaceHookArgWorkSpaceId } from './hooks/accessToWorkSpaceHook';
import { addStandardRoleToWorkSpace } from '../../../controllers/ws/roles/addStandardRoleToWorkSpace';
import { roleHook } from '../../hooks/roleHook';
import { RoleEnum } from '../../../types/enum/RoleEnum';
import { startWorkSpaceSchema } from './schema/startWorkSpaceSchema';
import z from 'zod';
import { stopWorkSpaceSchema } from './schema/stopWorkSpaceSchema';
import { getWorkSpaceSchema } from './schema/getWorkSpaceSchema';
import { addWorkSpaceRoleToUser } from '../../../controllers/ws/roles/giveWorkSpaceRoleToUser';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceRepo = f.repos.workSpaceRepo;
  const workSpaceRoleRepo = f.repos.workSpaceRoleRepo;
  const workSpaceUser = f.repos.workSpaceUserRepo;
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
          401: z.object({
            message: z.string(),
          }),
        },
      },
      preHandler: [(req, reply) => accessToWorkSpaceHookArgWorkSpaceId(req.params.id).bind(f)(req, reply)],
    },
    async (req, reply) => {
      const user = await workSpaceUser.existUserInWorkSpace(req.params.id, req.userData.id);
      if (!user) {
        reply.status(401).send({ message: 'You are not user in this workSpace' });
        return;
      }
      return {
        workSpaceAccessToken: f.jwt.sign({
          ...req.userData,
          workSpaceId: req.params.id,
        }),
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
    async (req) => {
      return {
        casualToken: f.jwt.sign({
          ...req.userData,
        }),
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
      const workSpace = await workSpaceRepo.createWorkSpace({ ...req.body, creatorId: req.userData.id });
      await workSpaceUser.addUserToWorkSpace(workSpace.id, req.userData.id);
      await addStandardRoleToWorkSpace(workSpaceRoleRepo, workSpace.id);
      await addWorkSpaceRoleToUser(workSpaceUserRoleRepo, req.userData.id, workSpace.id, 'Creator');
      return workSpace;
    },
  );
};

export default routes;
