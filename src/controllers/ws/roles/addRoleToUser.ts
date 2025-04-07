import { IWorkSpaceUserRoleRepo } from '../../../repos/workspace/userRole/workSpaceUserRole.repo';

export async function addRoleToUser(
  workSpaceUserRoleRepo: IWorkSpaceUserRoleRepo,
  userId: string,
  roleId: string,
): Promise<void> {
  return await workSpaceUserRoleRepo.giveRoleToUser(userId, roleId);
}
