import { IWorkSpaceRepo } from '../../repos/workspace/workspace.repo';
import { IWorkSpaceUserRepo } from '../../repos/workspace/user/workSpaceUser.repo';
import { WorkSpace } from '../../types/entities/WorkSpace/WorkSpaceSchema';
import { addStandardRoleToWorkSpace } from './roles/addStandardRoleToWorkSpace';
import { IWorkSpaceRoleRepo } from '../../repos/workspace/roles/workSpaceRoles.repo';
import { IWorkSpaceUserRoleRepo } from '../../repos/workspace/userRole/workSpaceUserRole.repo';
import { createWorkSpace } from './createWorkSpace';
import { addUserToWorkSpace } from './users/addUserToWorkSpace';
import { IWithTransaction } from '../../services/withTransaction/IWithTransaction';
import { IWorkSpaceRolePermissionRepo } from '../../repos/workspace/rolePermission/workSpaceRolePermission.repo';
import { addRoleToUserByValue } from './roles/AddRoleToUserByValue';
import { EDefaultRolesInWorkSpace } from '../../types/enum/EDefaultRolesInWorkSpace';
import { IUserLimits } from '../../repos/limits/userLimits.repo';
import { checkCreatedWorkSpaceLimit } from '../limits/workSpaceLimits/checkCreatedWorkSpaceLimit';
import { HttpError } from '../../api/error/HttpError';
import { increaseCountOfCreatedWorkSpace } from '../limits/workSpaceLimits/increaseCountOfCreatedWorkSpace';

export async function createWorkSpaceProcess(
  withTransaction: IWithTransaction,
  userLimitRepo: IUserLimits,
  workSpaceRepo: IWorkSpaceRepo,
  workSpaceUserRepo: IWorkSpaceUserRepo,
  workSpaceRoleRepo: IWorkSpaceRoleRepo,
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
      userLimitRepo,
    },
    async (repos) => {
      if (!(await checkCreatedWorkSpaceLimit(userLimitRepo, userId))) {
        throw new HttpError(403, 'You have reached the limit of created workspaces');
      }
      const workSpace = await createWorkSpace(repos.workSpaceRepo, {
        ...workSpaceCreateData,
        creatorId: userId,
      });
      const workSpaceUser = await addUserToWorkSpace(repos.workSpaceUserRepo, workSpace.id, userId);
      await addStandardRoleToWorkSpace(repos.workSpaceRoleRepo, repos.workSpaceRolePermissions, workSpace.id);
      await addRoleToUserByValue(
        repos.workSpaceRoleRepo,
        repos.workSpaceUserRoleRepo,
        workSpaceUser.id,
        EDefaultRolesInWorkSpace.Creator,
      );
      await increaseCountOfCreatedWorkSpace(userLimitRepo, userId);
      return workSpace;
    },
  );
}
