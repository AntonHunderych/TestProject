import ICrypto from '../../../services/crypto/ICrypto';
import { ApplicationError } from '../../../types/errors/ApplicationError';

export async function generateTokenToInviteLink(myCrypto: ICrypto): Promise<{ hash: string; salt: string }> {
  try {
    const plainToken = crypto.randomUUID();
    return await myCrypto.hash(plainToken);
  } catch (e) {
    throw new ApplicationError('Failed token to invite link');
  }
}
