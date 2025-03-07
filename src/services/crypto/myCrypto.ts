import { pbkdf2, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const pbkdf2Async = promisify(pbkdf2);

export interface ICrypto {
  hash(password: string): Promise<{ hash: string; salt: string }>;
  compare(password: string, storedHash: string, salt: string): Promise<boolean>;
}

export default function getCryptoService(): ICrypto {
  return {
    async hash(password: string): Promise<{ hash: string; salt: string }> {
      const salt = randomBytes(16).toString('hex');
      const hash = await pbkdf2Async(password, salt, 1000, 64, 'sha256');
      return { hash: hash.toString('hex'), salt };
    },

    async compare(password: string, storedHash: string, salt: string): Promise<boolean> {
      const hash = await pbkdf2Async(password, salt, 1000, 64, 'sha256');
      const originalHash = Buffer.from(storedHash, 'hex');
      return timingSafeEqual(hash, originalHash);
    },
  };
}
