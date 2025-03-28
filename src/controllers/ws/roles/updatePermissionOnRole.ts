import { IWorkSpaceRolesRepo } from '../../../repos/workspace/roles/workSpaceRoles.repo';
import { TDefaultRolesInWorkSpaceOrCustom } from '../../../types/TDefaultRolesInWorkSpace';
import { Permissions } from '../../../types/enum/PermisionsEnum';

export async function updatePermissionOnRole(
  workSpaceRoleRepo: IWorkSpaceRolesRepo,
  workSpaceId: string,
  roleValue: TDefaultRolesInWorkSpaceOrCustom,
  permissionsValue: Permissions[],
) {
  await workSpaceRoleRepo.updatePermissionOnRole(workSpaceId, roleValue, permissionsValue);
}
