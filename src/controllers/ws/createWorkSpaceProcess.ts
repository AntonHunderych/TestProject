import { IWorkSpaceRepos } from '../../repos/workspace/workspace.repo';
import { IWorkSpaceUserRepo } from '../../repos/workspace/user/workSpaceUser.repo';
import { IWorkSpace } from '../../types/entities/WorkSpaceSchema';
import { addStandardRoleToWorkSpace } from './roles/addStandardRoleToWorkSpace';
import { addWorkSpaceRoleToUser } from './roles/giveWorkSpaceRoleToUser';
import { IWorkSpaceRolesRepo } from '../../repos/workspace/roles/workSpaceRoles.repo';
import { IWorkSpaceUserRoleRepo } from '../../repos/workspace/userRole/workSpaceUserRole.repo';
import { createWorkSpace } from './createWorkSpace';
import { addUserToWorkSpace } from './users/addUserToWorkSpace';
import { IWithTransaction } from '../../services/withTransaction/IWithTransaction';
import { EDefaultRolesInWorkSpace } from '../../types/enum/EDefaultRolesInWorkSpace';

export async function createWorkSpaceProcess(
  withTransaction: IWithTransaction,
  workSpaceRepo: IWorkSpaceRepos,
  workSpaceUserRepo: IWorkSpaceUserRepo,
  workSpaceRoleRepo: IWorkSpaceRolesRepo,
  workSpaceUserRoleRepo: IWorkSpaceUserRoleRepo,
  workSpaceCreateData: { name: string; description: string },
  userId: string,
): Promise<IWorkSpace> {
  return await withTransaction(
    {
      workSpaceRepo,
      workSpaceUserRepo,
      workSpaceRoleRepo,
      workSpaceUserRoleRepo,
    },
    async (repos) => {
      const workSpace = await createWorkSpace(repos.workSpaceRepo, { ...workSpaceCreateData, creatorId: userId });
      await addUserToWorkSpace(repos.workSpaceUserRepo, workSpace.id, userId);
      await addStandardRoleToWorkSpace(repos.workSpaceRoleRepo, workSpace.id);
      await addWorkSpaceRoleToUser(repos.workSpaceUserRoleRepo, userId, workSpace.id, EDefaultRolesInWorkSpace.Creator);
      return workSpace;
    },
  );
}
