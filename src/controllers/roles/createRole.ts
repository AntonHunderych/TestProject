import { IRolesRepo } from '../../repos/roles/roles.repo';
import { Role } from '../../services/typeorm/entities/RoleEntity';

export async function createRole(roleRepo: IRolesRepo, data: Partial<Role>): Promise<Role> {
  return await roleRepo.addRole(data);
}
