import { IRolesRepo } from '../../repos/roles/roles.repo';
import { RoleEntity } from '../../services/typeorm/entities/RoleEntity';

export async function createRole(roleRepo: IRolesRepo, data: Partial<RoleEntity>): Promise<RoleEntity> {
  return await roleRepo.addRole(data);
}
