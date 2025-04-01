import { IRolesRepo } from '../../repos/roles/roles.repo';
import { RoleEntity } from '../../services/typeorm/entities/RoleEntity';

export async function getRoleByValue(rolesRepo: IRolesRepo, value: string): Promise<RoleEntity> {
  return await rolesRepo.getRoleByValue(value);
}
