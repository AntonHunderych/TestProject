import { Permissions } from '../../../types/enum/PermisionsEnum';
import { WorkSpaceRolesEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceRolesEntity';
import { IWorkSpaceRolesRepo } from '../../../repos/workspace/roles/workSpaceRoles.repo';
import { IWithTransaction } from '../../../services/withTransaction/IWithTransaction';
import { IWorkSpaceRolePermissionRepo } from '../../../repos/workspace/rolePermission/workSpaceRolePermission.repo';
import { _updatePermissionOnRole } from './_updatePermissionOnRole';

export async function createRoleHandler(
  withTransaction: IWithTransaction,
  workSpaceRoleRepo: IWorkSpaceRolesRepo,
  workSpaceRolesPermissionsRepo: IWorkSpaceRolePermissionRepo,
  workSpaceId: string,
  roleName: string,
  permissions: Permissions[],
): Promise<WorkSpaceRolesEntity> {
  return await withTransaction(
    {
      workSpaceRoleRepo,
      workSpaceRolesPermissionsRepo,
    },
    async (repos) => {
      const role = await repos.workSpaceRoleRepo.create(workSpaceId, roleName);
      await _updatePermissionOnRole(workSpaceRolesPermissionsRepo, role.id, permissions);
      return role;
    },
  );
}
