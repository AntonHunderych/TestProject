import { IUserRoleRepo } from '../../repos/userRole/userRole.repo';
import { IRolesRepo } from '../../repos/roles/roles.repo';

export async function giveRoleToUser(
  userRoleRepo: IUserRoleRepo,
  roleRepo: IRolesRepo,
  userId: string,
  roleValue: string,
): Promise<void> {
  const role = await roleRepo.getRoleByValue(roleValue);
  return await userRoleRepo.giveRoleToUser(userId, role.id);
}
