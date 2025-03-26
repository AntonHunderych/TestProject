import { IUserRoleRepo } from '../../repos/userRole/userRole.repo';
import { RoleEnum } from '../../types/enum/RoleEnum';
import { IRolesRepo } from '../../repos/roles/roles.repo';

export async function giveDefaultRoleToUser(
  userRoleRepo: IUserRoleRepo,
  roleRepo: IRolesRepo,
  userId: string,
): Promise<void> {
  const role = await roleRepo.getRoleByValue(RoleEnum.USER);
  return await userRoleRepo.giveRoleToUser(userId, role.id);
}
