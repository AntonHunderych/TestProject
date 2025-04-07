import { IWorkSpaceUserRoleRepo } from '../../../repos/workspace/userRole/workSpaceUserRole.repo';
import { IWorkSpaceRoleRepo } from '../../../repos/workspace/roles/workSpaceRoles.repo';
import { TDefaultRolesInWorkSpaceOrCustom } from '../../../types/TDefaultRolesInWorkSpace';

export async function addRoleToUserByValue(
  workSpaceRoleRepo: IWorkSpaceRoleRepo,
  workSpaceUserRoleRepo: IWorkSpaceUserRoleRepo,
  userId: string,
  roleValue: TDefaultRolesInWorkSpaceOrCustom,
): Promise<void> {
  const role = await workSpaceRoleRepo.getRoleByValue(roleValue);
  return await workSpaceUserRoleRepo.giveRoleToUser(userId, role.id);
}
