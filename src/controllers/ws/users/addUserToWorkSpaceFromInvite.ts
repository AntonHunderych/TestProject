import { IWorkSpaceInviteLink } from '../../../repos/workspace/inviteLink/inviteLink.repo';
import ICrypto from '../../../services/crypto/ICrypto';
import { HttpError } from '../../../api/error/HttpError';
import { addUserToWorkSpace } from './addUserToWorkSpace';
import { IWorkSpaceUserRepo } from '../../../repos/workspace/user/workSpaceUser.repo';
import { IWorkSpaceUserRoleRepo } from '../../../repos/workspace/userRole/workSpaceUserRole.repo';
import { addRoleToUserByValue } from '../roles/AddRoleToUserByValue';
import { EDefaultRolesInWorkSpace } from '../../../types/enum/EDefaultRolesInWorkSpace';
import { IWorkSpaceRoleRepo } from '../../../repos/workspace/roles/workSpaceRoles.repo';
import { IWithTransaction } from '../../../services/withTransaction/IWithTransaction';

export async function addUserToWorkSpaceFromInvite(
  withTransaction: IWithTransaction,
  workSpaceRoleRepo: IWorkSpaceRoleRepo,
  workSpaceUserRoleRepo: IWorkSpaceUserRoleRepo,
  workSpaceUserRepo: IWorkSpaceUserRepo,
  workSpaceInviteLinkRepo: IWorkSpaceInviteLink,
  crypto: ICrypto,
  token: string,
) {
  const [tokenValue, inviteId] = token.split('.');
  const invite = await workSpaceInviteLinkRepo.findValidInvite(inviteId);
  if (await crypto.compare(tokenValue, invite.token, invite.salt)) {
    throw new HttpError(403, 'Invalid token');
  }
  await withTransaction(
    {
      workSpaceUserRepo,
      workSpaceUserRoleRepo,
      workSpaceRoleRepo,
    },
    async (repos) => {
      const workSpaceUser = await addUserToWorkSpace(repos.workSpaceUserRepo, invite.workspaceId, invite.userId);
      await addRoleToUserByValue(
        repos.workSpaceRoleRepo,
        repos.workSpaceUserRoleRepo,
        workSpaceUser.id,
        EDefaultRolesInWorkSpace.User,
      );
    },
  );
  await workSpaceInviteLinkRepo.deleteInvite(inviteId);
}
