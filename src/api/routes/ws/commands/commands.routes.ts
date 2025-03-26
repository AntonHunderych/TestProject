import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../hooks/roleHook';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import z from 'zod';
import { RoleEnum } from '../../../../types/enum/RoleEnum';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceCommandRepo = f.repos.workSpaceCommandRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.get(
    '/',
    {
      schema: {},
    },
    async (req) => {
      return await workSpaceCommandRepo.getAll(req.workSpace.id);
    },
  );

  f.post(
    '/',
    {
      schema: {
        body: z.object({
          value: z.string(),
        }),
      },
    },
    async (req) => {
      return await workSpaceCommandRepo.create(req.workSpace.id, req.body.value);
    },
  );

  f.delete(
    '/',
    {
      schema: {
        body: z.object({
          value: z.string(),
        }),
      },
    },
    async (req) => {
      return await workSpaceCommandRepo.delete(req.workSpace.id, req.body.value);
    },
  );

  f.post(
    '/addUser',
    {
      schema: {
        body: z.object({
          value: z.string(),
          userId: z.string(),
        }),
      },
    },
    async (req) => {
      return await workSpaceCommandRepo.addUser(req.workSpace.id, req.body.value, req.body.userId);
    },
  );

  f.delete(
    '/removeUser',
    {
      schema: {
        body: z.object({
          value: z.string(),
          userId: z.string(),
        }),
      },
    },
    async (req) => {
      return await workSpaceCommandRepo.removeUser(req.workSpace.id, req.body.value, req.body.userId);
    },
  );
};

export default routes;
