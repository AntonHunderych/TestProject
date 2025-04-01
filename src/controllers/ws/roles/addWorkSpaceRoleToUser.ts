import { IWorkSpaceUserRoleRepo } from '../../../repos/workspace/userRole/workSpaceUserRole.repo';
import { WorkSpaceUserEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceUserEntity';
import { TDefaultRolesInWorkSpaceOrCustom } from '../../../types/TDefaultRolesInWorkSpace';

export async function addWorkSpaceRoleToUser(
  workSpaceUserRoleRepo: IWorkSpaceUserRoleRepo,
  userId: string,
  workSpaceId: string,
  roleValue: TDefaultRolesInWorkSpaceOrCustom,
): Promise<WorkSpaceUserEntity> {
  return await workSpaceUserRoleRepo.giveRoleToUser(userId, workSpaceId, roleValue);
}
