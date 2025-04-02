import { IWorkSpaceRolesRepo } from '../../../repos/workspace/roles/workSpaceRoles.repo';
import { TDefaultRolesInWorkSpaceOrCustom } from '../../../types/TDefaultRolesInWorkSpace';
import { WorkSpaceRolesEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceRolesEntity';

export async function createRole(
  workSpaceRoleRepo: IWorkSpaceRolesRepo,
  workSpaceId: string,
  roleValue: TDefaultRolesInWorkSpaceOrCustom,
): Promise<WorkSpaceRolesEntity> {
  return await workSpaceRoleRepo.create(workSpaceId, roleValue);
}
