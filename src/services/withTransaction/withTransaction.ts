import { DataSource, EntityManager } from 'typeorm';
import { IWithTransaction } from './IWithTransaction';

export function getWithTransaction(db: DataSource): IWithTransaction {
  return async function (inputRepos, callback) {
    return await db.transaction(async (transactionalEntityManager: EntityManager) => {
      const transactionalRepos = Object.fromEntries(
        Object.entries(inputRepos).map(([key, value]) => [key, value.__recreateFunction(transactionalEntityManager)]),
      ) as typeof inputRepos;
      return await callback(transactionalRepos);
    });
  };
}
