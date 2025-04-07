import { IWorkSpaceRoleRepo } from '../../../repos/workspace/roles/workSpaceRoles.repo';

export async function deleteRole(workSpaceRole: IWorkSpaceRoleRepo, roleId: string): Promise<void> {
  await workSpaceRole.deleteRole(roleId);
}
