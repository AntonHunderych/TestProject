import { IWorkSpaceUserRoleRepo } from '../../../repos/workspace/userRole/workSpaceUserRole.repo';

export async function removeRoleFromUser(
  workSpaceUserRoleRepo: IWorkSpaceUserRoleRepo,
  userId: string,
  roleId: string,
): Promise<void> {
  await workSpaceUserRoleRepo.removeRoleFromUser(userId, roleId);
}
