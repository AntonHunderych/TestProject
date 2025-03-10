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

  f.get(
    '/',
    {
      schema: {
        response: {
          200: getUsersRespSchema,
        },
      },
      preHandler: roleHook([RoleEnum.USER, RoleEnum.ADMIN]),
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
    '/',
    {
      schema: {
        body: createUserSchema,
        response: {
          200: createRespUserSchema,
        },
      },
    },
    async (req) => {
      await createUserHandler(userRepo, userRoleRepo, {
        ...req.body,
        salt: 'adminCreatedUserSalt',
      });
    },
  );

  f.delete(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        response: {
          200: deleteRespUserSchema,
        },
      },
    },
    async (req) => await deleteUserHandler(userRepo, req.params.id),
  );

  f.post(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        body: updateUserSchema,
        response: {
          200: createRespUserSchema,
        },
      },
    },
    async (req) => updateUserHandler(userRepo, req.params.id, req.body),
  );
};

export default routes;
