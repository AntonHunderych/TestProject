import { IMailSender } from '../../../services/mailSender/IMailSender';
import { IUserRepo } from '../../../repos/users/users.repo';
import { ApplicationError } from '../../../types/errors/ApplicationError';
import { generateInviteLink } from './generateInviteLink';
import ICrypto from '../../../services/crypto/ICrypto';
import { IWorkSpaceInviteLink } from '../../../repos/workspace/inviteLink/inviteLink.repo';
import { ESandGridTemplateID } from '../../../types/enum/ESandGridTemplateID';
import { IWorkSpaceUserRepo } from '../../../repos/workspace/user/workSpaceUser.repo';

export async function inviteUserToWorkSpace(
  mailSender: IMailSender,
  userRepo: IUserRepo,
  workSpaceUserRepo: IWorkSpaceUserRepo,
  workSpaceInviteLinkRepo: IWorkSpaceInviteLink,
  crypto: ICrypto,
  workSpaceId: string,
  userId: string,
  inviterUserId: string,
): Promise<void> {
  const user = await userRepo.getUserById(userId);
  if (!user) {
    throw new ApplicationError('User not found');
  }

  const workSpaceUser = await workSpaceUserRepo.getUserWithWorkSpace(inviterUserId, workSpaceId);

  const inviteLink = await generateInviteLink(workSpaceInviteLinkRepo, crypto, workSpaceId, userId);

  await mailSender.sendEmailToPerson({
    to: user.email,
    subject: 'TestProject: Invite to WorkSpace',
    templateId: ESandGridTemplateID.InviteToWorkSpace,
    dynamic_template_data: {
      userName: user.username,
      inviterName: workSpaceUser.user.username,
      workSpaceName: workSpaceUser.workSpace.name,
      inviteUrl: inviteLink,
      year: new Date().getFullYear(),
    },
  });
}
