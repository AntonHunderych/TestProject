import { Permissions } from '../../../types/enum/EPermissions';
import { IWorkSpaceRolePermissionRepo } from '../../../repos/workspace/rolePermission/workSpaceRolePermission.repo';
import { IWithTransaction } from '../../../services/withTransaction/IWithTransaction';

export async function updatePermissionOnRole(
  workSpaceRolePermissionRepo: IWorkSpaceRolePermissionRepo,
  roleId: string,
  permissionsValues: Permissions[],
  withTransaction: IWithTransaction,
): Promise<void> {
  await withTransaction(
    {
      workSpaceRolePermissionRepo,
    },
    async (repos) => {
      await repos.workSpaceRolePermissionRepo.updatePermissionOnRoleWithTransactionOnly(roleId, permissionsValues);
    },
  );
}
