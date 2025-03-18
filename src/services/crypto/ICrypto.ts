export default interface ICrypto {
  hash(password: string): Promise<{
    hash: string;
    salt: string;
  }>;
  compare(password: string, hash: string, salt: string): Promise<boolean>;
}
