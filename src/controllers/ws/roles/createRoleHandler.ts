import { Permissions } from '../../../types/enum/EPermissions';
import { IWorkSpaceRoleRepo } from '../../../repos/workspace/roles/workSpaceRoles.repo';
import { IWithTransaction } from '../../../services/withTransaction/IWithTransaction';
import { IWorkSpaceRolePermissionRepo } from '../../../repos/workspace/rolePermission/workSpaceRolePermission.repo';
import { _updatePermissionOnRole } from './_updatePermissionOnRole';
import { IWorkSpaceRole } from '../../../types/entities/WorkSpace/WorkSpaceRolesSchema';

export async function createRoleHandler(
  withTransaction: IWithTransaction,
  workSpaceRoleRepo: IWorkSpaceRoleRepo,
  workSpaceRolesPermissionsRepo: IWorkSpaceRolePermissionRepo,
  workSpaceId: string,
  roleName: string,
  permissions: Permissions[],
): Promise<IWorkSpaceRole> {
  return await withTransaction(
    {
      workSpaceRoleRepo,
      workSpaceRolesPermissionsRepo,
    },
    async (repos) => {
      const role = await repos.workSpaceRoleRepo.createRole(workSpaceId, roleName);
      await _updatePermissionOnRole(workSpaceRolesPermissionsRepo, role.id, permissions);
      return role;
    },
  );
}
