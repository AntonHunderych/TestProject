import { IWorkSpaceRepos } from '../../repos/workspace/workspace.repo';
import { IWorkSpaceUserRepo } from '../../repos/workspace/user/workSpaceUser.repo';
import { WorkSpace } from '../../types/entities/WorkSpace/WorkSpaceSchema';
import { addStandardRoleToWorkSpace } from './roles/addStandardRoleToWorkSpace';
import { addWorkSpaceRoleToUser } from './roles/addWorkSpaceRoleToUser';
import { IWorkSpaceRolesRepo } from '../../repos/workspace/roles/workSpaceRoles.repo';
import { IWorkSpaceUserRoleRepo } from '../../repos/workspace/userRole/workSpaceUserRole.repo';
import { createWorkSpace } from './createWorkSpace';
import { addUserToWorkSpace } from './users/addUserToWorkSpace';
import { IWithTransaction } from '../../services/withTransaction/IWithTransaction';
import { IWorkSpaceRolePermissionRepo } from '../../repos/workspace/rolePermission/workSpaceRolePermission.repo';

export async function createWorkSpaceProcess(
  withTransaction: IWithTransaction,
  workSpaceRepo: IWorkSpaceRepos,
  workSpaceUserRepo: IWorkSpaceUserRepo,
  workSpaceRoleRepo: IWorkSpaceRolesRepo,
  workSpaceUserRoleRepo: IWorkSpaceUserRoleRepo,
  workSpaceRolePermissions: IWorkSpaceRolePermissionRepo,
  workSpaceCreateData: { name: string; description: string },
  userId: string,
): Promise<WorkSpace> {
  return await withTransaction(
    {
      workSpaceRepo,
      workSpaceUserRepo,
      workSpaceRoleRepo,
      workSpaceUserRoleRepo,
      workSpaceRolePermissions,
    },
    async (repos) => {
      const workSpace = await createWorkSpace(repos.workSpaceRepo, {
        ...workSpaceCreateData,
        creatorId: userId,
      });
      await addUserToWorkSpace(repos.workSpaceUserRepo, workSpace.id, userId);
      const roles = await addStandardRoleToWorkSpace(
        repos.workSpaceRoleRepo,
        repos.workSpaceRolePermissions,
        workSpace.id,
      );
      await addWorkSpaceRoleToUser(repos.workSpaceUserRoleRepo, userId, workSpace.id, roles[0].id);
      return workSpace;
    },
  );
}
