import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { roleHook } from '../../../../hooks/roleHook';
import { addRemoveRoleSchema } from './schemas/addRemoveRoleSchema';
import { giveRoleToUser } from '../../../../../controllers/userRole/giveRoleToUser';
import { removeRoleFromUser } from '../../../../../controllers/userRole/removeRoleFromUser';
import { ERole } from '../../../../../types/enum/ERole';

const routes: FastifyPluginAsyncZod = async (f) => {
  const userRoleRepo = f.repos.userRoleRepo;
  const roleRepo = f.repos.roleRepo;

  f.addHook('preHandler', roleHook([ERole.ADMIN]));

  f.post(
    '/',
    {
      schema: {
        body: addRemoveRoleSchema,
      },
    },
    async (req) => {
      return await giveRoleToUser(userRoleRepo, roleRepo, req.body.userId, req.body.roleValue);
    },
  );

  f.delete(
    '/',
    {
      schema: {
        body: addRemoveRoleSchema,
      },
    },
    async (req) => {
      return await removeRoleFromUser(userRoleRepo, roleRepo, req.body.userId, req.body.roleValue);
    },
  );
};

export default routes;
