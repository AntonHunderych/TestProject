import { IRolesRepo } from '../../repos/roles/roles.repo';
import { Role } from '../../services/typeorm/entities/RoleEntity';

export async function getRoleByValue(rolesRepo: IRolesRepo, value: string): Promise<Role> {
  return await rolesRepo.getRoleByValue(value);
}
