import { Permissions } from '../../../../types/enum/PermisionsEnum';
import { preHandlerAsyncHookHandler } from 'fastify';

export function permissionsAccessHook(requiredPermissions: Permissions): preHandlerAsyncHookHandler {
  return async function (req, res) {
    if (req.isAdmin) {
      return;
    }

    const repo = this.repos.workSpaceUserRepo;
    const user = await repo.existUserInWorkSpace(req.workSpace.id, req.userData.id);

    const userPermissions: string[] = user!.roles.flatMap((role) =>
      role.role.permissions.map((permission) => permission.value),
    );

    if (!userPermissions.includes(requiredPermissions)) {
      return res.status(400).send({ message: 'You dont have requiredPermissions!' });
    }
  };
}
