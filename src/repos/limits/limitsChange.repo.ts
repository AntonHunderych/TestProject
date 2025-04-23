import { IRecreateRepo } from '../../types/IRecreatebleRepo';
import { DataSource, EntityManager } from 'typeorm';
import { LimitsChangeEntity } from '../../services/typeorm/entities/LimitsChangeEntity';
import { DBError } from '../../types/errors/DBError';
import { EUserLimits } from '../../types/enum/EUserLimits';

export interface ILimitsChange extends IRecreateRepo {
  logChange(userId: string, limitName: EUserLimits, previousLimit: number, currentLimit: number): Promise<void>;
}

export function getLimitChangeRepo(db: DataSource | EntityManager): ILimitsChange {
  const limitsChangeRepo = db.getRepository(LimitsChangeEntity);

  return {
    async logChange(
      userId: string,
      limitName: EUserLimits,
      previousLimit: number,
      currentLimit: number,
    ): Promise<void> {
      try {
        await limitsChangeRepo
          .createQueryBuilder()
          .insert()
          .values({
            userId,
            limitName,
            previousLimit,
            currentLimit,
          })
          .execute();
      } catch (e) {
        throw new DBError('Error logging limits change', e);
      }
    },
    __recreateFunction: getLimitChangeRepo,
  };
}
