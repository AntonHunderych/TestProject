import { IWorkSpaceUserRoleRepo } from '../../../repos/workspace/userRole/workSpaceUserRole.repo';

export async function addWorkSpaceRoleToUser(
  workSpaceUserRoleRepo: IWorkSpaceUserRoleRepo,
  userId: string,
  workSpaceId: string,
  roleId: string,
): Promise<void> {
  return await workSpaceUserRoleRepo.giveRoleToUser(userId, workSpaceId, roleId);
}
