import { UserLimitsEntity } from '../../services/typeorm/entities/UserLimitsEntity';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';
import { DataSource, EntityManager } from 'typeorm';
import { DBError } from '../../types/errors/DBError';

export interface IUserLimits extends IRecreateRepo {
  createUserLimits(userId: string): Promise<void>;
  updateUserLimits(userId: string, data: Partial<UserLimitsEntity>): Promise<void>;
  getUserLimits(userId: string): Promise<UserLimitsEntity>;
}

export function getUserLimitRepo(db: DataSource | EntityManager): IUserLimits {
  const userLimitsRepo = db.getRepository(UserLimitsEntity);

  return {
    async createUserLimits(userId: string): Promise<void> {
      try {
        await userLimitsRepo
          .createQueryBuilder()
          .insert()
          .values({
            userId,
            createdWorkSpaces: 0,
            maxCreatedWorkspaces: 3,
          })
          .execute();
      } catch (e) {
        throw new DBError('Error create user limits', e);
      }
    },
    async getUserLimits(userId: string): Promise<UserLimitsEntity> {
      try {
        return await userLimitsRepo.findOneOrFail({
          where: {
            userId,
          },
        });
      } catch (e) {
        throw new DBError('Error getting user limits', e);
      }
    },
    async updateUserLimits(userId: string, data: Partial<UserLimitsEntity>): Promise<void> {
      try {
        await userLimitsRepo.createQueryBuilder().update().set(data).where('userId=:userId', { userId }).execute();
      } catch (e) {
        throw new DBError('Error update user limits', e);
      }
    },
    __recreateFunction: getUserLimitRepo,
  };
}
