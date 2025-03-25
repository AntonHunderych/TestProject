import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { RoleEnum } from '../../../../types/Enum/RoleEnum';
import { roleHook } from '../../../hooks/roleHook';
import { addRemoveRoleSchema } from './schemas/addRemoveRoleSchema';
import { giveRoleToUser } from '../../../../controllers/userRole/giveRoleToUser';
import { removeRoleFromUser } from '../../../../controllers/userRole/removeRoleFromUser';

const routes: FastifyPluginAsyncZod = async (f) => {
  const userRoleRepo = f.repos.userRoleRepo;

  f.addHook('preHandler', roleHook([RoleEnum.ADMIN]));

  f.post(
    '/:id',
    {
      schema: {
        body: addRemoveRoleSchema,
      },
    },
    async (req) => {
      return await giveRoleToUser(userRoleRepo, req.body.userId, req.body.roleValue);
    },
  );

  f.delete(
    '/:id',
    {
      schema: {
        body: addRemoveRoleSchema,
      },
    },
    async (req) => {
      return await removeRoleFromUser(userRoleRepo, req.body.userId, req.body.roleValue);
    },
  );
};

export default routes;
