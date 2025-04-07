import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { ERole } from '../../../../types/enum/ERole';
import { roleHook } from '../../../hooks/roleHook';
import { getUsersRespSchema } from '../../users/schemas/getUsersSchema';
import getAllUsers from '../../../../controllers/users/getUsers';
import { createUserSchema } from '../../users/schemas/createUserSchema';
import { createRespUserSchema } from '../../users/schemas/createRespUserSchema';
import createUser from '../../../../controllers/users/createUser';
import { UUIDGetter } from '../../../common/schemas/UUIDGetter';
import { deleteRespUserSchema } from '../../users/schemas/deleteRespUserSchema';
import deleteUser from '../../../../controllers/users/deleteUser';
import { updateUserSchema } from '../../users/schemas/updateUserSchema';
import updateUser from '../../../../controllers/users/updateUser';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const userRepo = f.repos.userRepo;
  const userRoleRepo = f.repos.userRoleRepo;
  const roleRepo = f.repos.roleRepo;

  f.addHook('preHandler', roleHook([ERole.ADMIN]));

  f.get(
    '/',
    {
      schema: {
        response: {
          200: getUsersRespSchema,
        },
      },
    },
    async () => {
      const users = await getAllUsers(userRepo);
      return {
        data: users,
        count: users.length,
      };
    },
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
      preHandler: roleHook([ERole.ADMIN]),
    },
    async (req) => {
      await createUser(f.withTransaction, userRepo, roleRepo, userRoleRepo, {
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
      preHandler: roleHook([ERole.ADMIN]),
    },
    async (req) => await deleteUser(userRepo, req.params.id),
  );

  f.put(
    '/:id',
    {
      schema: {
        params: UUIDGetter,
        body: updateUserSchema,
        response: {
          200: createRespUserSchema,
        },
      },
      preHandler: roleHook([ERole.ADMIN]),
    },
    async (req) => updateUser(userRepo, req.params.id, req.body),
  );
};

export default routes;
