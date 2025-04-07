import { IWorkSpaceRoleRepo } from '../../../repos/workspace/roles/workSpaceRoles.repo';
import { TDefaultRolesInWorkSpaceOrCustom } from '../../../types/TDefaultRolesInWorkSpace';
import { IWorkSpaceRole } from '../../../types/entities/WorkSpace/WorkSpaceRolesSchema';

export async function createRole(
  workSpaceRoleRepo: IWorkSpaceRoleRepo,
  workSpaceId: string,
  roleValue: TDefaultRolesInWorkSpaceOrCustom,
): Promise<IWorkSpaceRole> {
  return await workSpaceRoleRepo.createRole(workSpaceId, roleValue);
}
