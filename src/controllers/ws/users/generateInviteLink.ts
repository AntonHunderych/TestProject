import { generateTokenToInviteLink } from './generateTokenToInviteLink';
import ICrypto from '../../../services/crypto/ICrypto';
import { IWorkSpaceInviteLink } from '../../../repos/workspace/inviteLink/inviteLink.repo';

export async function generateInviteLink(
  workSpaceInviteLinkRepo: IWorkSpaceInviteLink,
  crypto: ICrypto,
  workSpaceId: string,
  userId: string,
): Promise<string> {
  const { hash, salt } = await generateTokenToInviteLink(crypto);
  const inviteId = await workSpaceInviteLinkRepo.createInvite(workSpaceId, userId, hash, salt);
  return `${process.env.WEB_APP_URL}/api/ws/users/invite?token=${hash + '.' + inviteId}`;
}
