import { DataSource, EntityManager } from 'typeorm';
import { TokenEntity } from '../../services/typeorm/entities/TokenEntity';
import { DBError } from '../../types/errors/DBError';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';

export interface ITokenRepo extends IRecreateRepo {
  saveRefreshToken(userId: string, value: string): Promise<void>;

  deleteRefreshToken(userId: string): Promise<void>;

  findTokenByValue(value: string): Promise<TokenEntity>;
}

export function getTokenRepo(db: DataSource | EntityManager): ITokenRepo {
  const tokenRepo = db.getRepository(TokenEntity);

  return {
    async saveRefreshToken(userId: string, value: string): Promise<void> {
      try {
        await tokenRepo.upsert({ userId, value }, { conflictPaths: ['userId'] });
      } catch (error) {
        throw new DBError('Failed to create refresh token', error);
      }
    },
    async deleteRefreshToken(userId: string): Promise<void> {
      try {
        await tokenRepo.delete({ userId });
      } catch (error) {
        throw new DBError('Failed to delete refresh token', error);
      }
    },
    async findTokenByValue(value: string): Promise<TokenEntity> {
      try {
        return await tokenRepo.findOneOrFail({ where: { value } });
      } catch (error) {
        throw new DBError('Failed to find token by user id', error);
      }
    },
    __recreateFunction: getTokenRepo,
  };
}
