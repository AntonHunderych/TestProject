import { DataSource } from 'typeorm';
import { TokenEntity } from '../../db/entities/tokenEntity';
import { DBError } from '../../types/Errors/DBError';

export function getTokenRepo(db: DataSource) {

  const tokenRepo = db.getRepository(TokenEntity);

  return {
    async createRefreshToken(userId: string, value: string) : Promise<void> {
      try {
        await tokenRepo.save({ userId: userId, value: value });
      } catch (error) {
        throw new DBError('Failed to create refresh token', error);
      }
    },
    async deleteRefreshToken(userId: string) : Promise<void> {
      try {
        await tokenRepo.delete({ userId: userId });
      } catch (error) {
        throw new DBError('Failed to delete refresh token', error);
      }
    },
    async findTokenById(value: string): Promise<TokenEntity> {
      try {
        return  await tokenRepo.findOneOrFail({where: { value: value }});
      } catch (error) {
        throw new DBError('Failed to find token by user id', error);
      }
    }
  };

}