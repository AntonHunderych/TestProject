import { IUserRoleRepo } from '../../repos/userRole/userRole.repo';

export async function removeRoleFromUser(
  userRoleRepo: IUserRoleRepo,
  userId: string,
  roleValue: string,
): Promise<boolean> {
  return await userRoleRepo.removeRoleFromUser(userId, roleValue);
}
