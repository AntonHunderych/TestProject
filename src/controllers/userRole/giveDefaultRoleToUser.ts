import { IUserRoleRepo } from '../../repos/userRole/userRole.repo';
import { RoleEnum } from '../../types/Enum/RoleEnum';

export async function giveDefaultRoleToUser(userRoleRepo: IUserRoleRepo, userId: string): Promise<boolean> {
  return await userRoleRepo.giveRoleToUser(userId, RoleEnum.USER);
}
