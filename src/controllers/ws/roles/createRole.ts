import { IWorkSpaceRolesRepo } from '../../../repos/workspace/roles/workSpaceRoles.repo';
import { TDefaultRolesInWorkSpaceOrCustom } from '../../../types/TDefaultRolesInWorkSpace';

export async function createRole(
  workSpaceRoleRepo: IWorkSpaceRolesRepo,
  workSpaceId: string,
  roleValue: TDefaultRolesInWorkSpaceOrCustom,
): Promise<void> {
  await workSpaceRoleRepo.create(workSpaceId, roleValue);
}
