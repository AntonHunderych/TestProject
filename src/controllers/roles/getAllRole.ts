import { IRolesRepo } from '../../repos/roles/roles.repo';

export async function getAllRoles(roleRepo: IRolesRepo): Promise<any[]> {
  return await roleRepo.getAllRoles();
}
