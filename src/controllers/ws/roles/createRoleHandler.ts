import { Permissions } from '../../../types/enum/PermisionsEnum';
import { WorkSpaceRoles } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceRolesEntity';
import { IWorkSpaceRolesRepo } from '../../../repos/workspace/roles/workSpaceRoles.repo';
import { IWithTransaction } from '../../../services/withTransaction/IWithTransaction';

export async function createRoleHandler(
  withTransaction: IWithTransaction,
  workSpaceRoleRepo: IWorkSpaceRolesRepo,
  workSpaceId: string,
  roleName: string,
  permissions: Permissions[],
): Promise<WorkSpaceRoles> {
  return await withTransaction(
    {
      workSpaceRoleRepo,
    },
    async (repos) => {
      await repos.workSpaceRoleRepo.create(workSpaceId, roleName);
      return await repos.workSpaceRoleRepo.updatePermissionOnRole(workSpaceId, roleName, permissions);
    },
  );
}
