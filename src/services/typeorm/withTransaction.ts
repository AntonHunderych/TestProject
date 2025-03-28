import { EntityManager } from 'typeorm';
import { IRepos } from '../../repos';
import { pgDataSource } from './data-sourse';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';

export async function withTransaction<T extends { [K in keyof IRepos]?: IRecreateRepo }, R>(
  inputRepos: T,
  callback: (repos: T) => Promise<R>,
): Promise<R> {
  return await pgDataSource.transaction(async (transactionalEntityManager: EntityManager) => {
    const transactionalRepos = Object.fromEntries(
      Object.entries(inputRepos).map(([key, value]) => [key, value.__recreateFunction(transactionalEntityManager)]),
    ) as T;
    return await callback(transactionalRepos);
  });
}
