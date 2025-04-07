import { Permissions } from '../../../types/enum/EPermissions';
import { IWorkSpaceRolePermissionRepo } from '../../../repos/workspace/rolePermission/workSpaceRolePermission.repo';

// Dont use this function use updatePermissionsOnRole
export async function _updatePermissionOnRole(
  workSpaceRolePermissionRepo: IWorkSpaceRolePermissionRepo,
  roleId: string,
  permissionsValues: Permissions[],
): Promise<void> {
  await workSpaceRolePermissionRepo.updatePermissionOnRoleWithTransactionOnly(roleId, permissionsValues);
}
