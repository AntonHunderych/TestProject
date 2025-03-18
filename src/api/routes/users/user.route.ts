import { createRespUserSchema, createUserSchema } from './schemas/createUserSchema';
import { getUsersRespSchema } from './schemas/getUsersSchema';
import { UUIDGetter } from '../schemas/UUIDGetter';
import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import createUserHandler from '../../../controllers/users/createUser';
import getUserByIdHandler from '../../../controllers/users/getUser';
import deleteUserHandler from '../../../controllers/users/deleteUser';
import updateUserHandler from '../../../controllers/users/updateUser';
import getAllUsersHandler from '../../../controllers/users/getUsers';
import { deleteRespUserSchema } from './schemas/deleteRespUserSchema';
import { updateUserSchema } from './schemas/updateUserSchema';
import { roleHook } from '../../hooks/roleHook';
import { RoleEnum } from '../../../Types/Enum/RoleEnum';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const userRepo = f.repos.userRepo;
  const userRoleRepo = f.repos.userRoleRepo;

  f.addHook('preHandler', roleHook([RoleEnum.USER]));

  f.get(
    '/admin/',
    {
      schema: {
        response: {
          200: getUsersRespSchema,
        },
      },
      preHandler: roleHook([RoleEnum.ADMIN]),
    },
    async () => {
      const users = await getAllUsersHandler(userRepo);
      return {
        data: users,
        count: users.length,
      };
    },
  );

  f.get(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: createRespUserSchema,
        },
      },
    },
    async (req) => await getUserByIdHandler(userRepo, req.params.id),
  );

  f.post(
    '/admin/',
    {
      schema: {
        body: createUserSchema,
        response: {
          200: createRespUserSchema,
        },
      },
      preHandler: roleHook([RoleEnum.ADMIN]),
    },
    async (req) => {
      await createUserHandler(userRepo, userRoleRepo, {
        ...req.body,
        salt: 'adminCreatedUserSalt',
      });
    },
  );

  f.delete(
    '/admin/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: deleteRespUserSchema,
        },
      },
      preHandler: roleHook([RoleEnum.ADMIN]),
    },
    async (req) => await deleteUserHandler(userRepo, req.params.id),
  );

  f.post(
    '/admin/:id',
    {
      schema: {
        params: UUIDGetter,
        body: updateUserSchema,
        response: {
          200: createRespUserSchema,
        },
      },
      preHandler: roleHook([RoleEnum.ADMIN]),
    },
    async (req) => updateUserHandler(userRepo, req.params.id, req.body),
  );
};

export default routes;
