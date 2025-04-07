import { IMailSender } from '../../../services/mailSender/IMailSender';
import { IUserRepo } from '../../../repos/users/users.repo';
import { ApplicationError } from '../../../types/errors/ApplicationError';
import { generateInviteLink } from './generateInviteLink';
import ICrypto from '../../../services/crypto/ICrypto';
import { IWorkSpaceInviteLink } from '../../../repos/workspace/inviteLink/inviteLink.repo';

export async function inviteUserToWorkSpace(
  mailSender: IMailSender,
  userRepo: IUserRepo,
  workSpaceInviteLinkRepo: IWorkSpaceInviteLink,
  crypto: ICrypto,
  workSpaceId: string,
  userId: string,
): Promise<void> {
  const user = await userRepo.getUserById(userId);
  if (!user) {
    throw new ApplicationError('User not found');
  }

  const inviteLink = await generateInviteLink(workSpaceInviteLinkRepo, crypto, workSpaceId, userId);

  await mailSender.sendEmailToPerson({
    to: user.email,
    subject: 'TestProject: Invite to WorkSpace',
    html: `<p>Тебе запросили в workspace. <a href="${inviteLink}">Прийняти запрошення</a></p>`,
  });
}
