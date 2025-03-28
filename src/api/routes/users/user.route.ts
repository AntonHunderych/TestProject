import { createUserSchema } from './schemas/createUserSchema';
import { getUsersRespSchema } from './schemas/getUsersSchema';
import { UUIDGetter } from '../../common/schemas/UUIDGetter';
import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import createUser from '../../../controllers/users/createUser';
import getUserById from '../../../controllers/users/getUser';
import deleteUser from '../../../controllers/users/deleteUser';
import updateUser from '../../../controllers/users/updateUser';
import getAllUsers from '../../../controllers/users/getUsers';
import { deleteRespUserSchema } from './schemas/deleteRespUserSchema';
import { updateUserSchema } from './schemas/updateUserSchema';
import { roleHook } from '../../hooks/roleHook';
import { RoleEnum } from '../../../types/enum/RoleEnum';
import { createRespUserSchema } from './schemas/createRespUserSchema';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const userRepo = f.repos.userRepo;
  const userRoleRepo = f.repos.userRoleRepo;
  const roleRepo = f.repos.roleRepo;

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
      const users = await getAllUsers(userRepo);
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
    async (req) => await getUserById(userRepo, req.params.id),
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
      await createUser(userRepo, roleRepo, userRoleRepo, {
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
    async (req) => await deleteUser(userRepo, req.params.id),
  );

  f.put(
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
    async (req) => updateUser(userRepo, req.params.id, req.body),
  );
};

export default routes;
