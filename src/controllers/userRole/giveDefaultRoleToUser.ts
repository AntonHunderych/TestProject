import { IUserRoleRepo } from '../../repos/userRole/userRole.repo';
import { ERole } from '../../types/enum/ERole';
import { IRolesRepo } from '../../repos/roles/roles.repo';

export async function giveDefaultRoleToUser(
  userRoleRepo: IUserRoleRepo,
  roleRepo: IRolesRepo,
  userId: string,
): Promise<void> {
  const role = await roleRepo.getRoleByValue(ERole.USER);
  return await userRoleRepo.giveRoleToUser(userId, role.id);
}
