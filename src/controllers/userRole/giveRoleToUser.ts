import { IUserRoleRepo } from '../../repos/userRole/userRole.repo';

export async function giveRoleToUser(userRoleRepo: IUserRoleRepo, userId: string, roleValue: string): Promise<boolean> {
  return await userRoleRepo.giveRoleToUser(userId, roleValue);
}
