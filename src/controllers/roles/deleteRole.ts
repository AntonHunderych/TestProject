import { IRolesRepo } from '../../repos/roles/roles.repo';

export async function deleteRole(roleRepo: IRolesRepo, value: string): Promise<any> {
  return await roleRepo.deleteRole(value);
}
