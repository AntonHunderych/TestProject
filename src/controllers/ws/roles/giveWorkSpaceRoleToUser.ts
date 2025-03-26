import { IWorkSpaceUserRoleRepo } from '../../../repos/workspace/userRole/workSpaceUserRole.repo';
import { WorkSpaceUser } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceUserEntity';

export async function addWorkSpaceRoleToUser(
  workSpaceUserRoleRepo: IWorkSpaceUserRoleRepo,
  userId: string,
  workSpaceId: string,
  roleValue: string,
): Promise<WorkSpaceUser> {
  return await workSpaceUserRoleRepo.giveRoleToUser(userId, workSpaceId, roleValue);
}
