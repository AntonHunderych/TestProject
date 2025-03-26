import { Permissions } from '../../../../types/enum/PermisionsEnum';
import { preHandlerAsyncHookHandler } from 'fastify';

export function permissionsAccessHook(requiredPermissions: Permissions): preHandlerAsyncHookHandler {
  return async function (req, res) {
    if (req.userData.isAdmin) {
      return;
    }

    const repo = this.repos.workSpaceUserRoleRepo;
    const userRoleInWorkSpace = await repo.getAllUserRoles(req.userData.id, req.workSpace.id);

    const userPermissions: string[] = userRoleInWorkSpace.flatMap((role) =>
      role.permissions.map((permission) => permission.value),
    );

    console.log(userPermissions);

    if (!userPermissions.includes(requiredPermissions)) {
      return res.status(400).send({ message: 'You dont have requiredPermissions!' });
    }
  };
}
