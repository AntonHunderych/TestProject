import { EntityManager } from 'typeorm';
import { IRepos } from '../repos';
import { pgDataSource } from './data-sourse';
import { IRecreateRepo } from '../types/IRecreatebleRepo';

export async function withTransaction<T extends { [K in keyof IRepos]?: IRecreateRepo }, R>(
  inputRepos: T,
  callback: (repos: T) => Promise<R>,
): Promise<R> {
  return await pgDataSource.transaction(async (transactionalEntityManager: EntityManager) => {
    Object.entries(inputRepos).forEach(([key, value]) => {
      if (value && value.__recreateFunction) {
        inputRepos[key as keyof T] = value.__recreateFunction(transactionalEntityManager);
      }
    });
    return await callback(inputRepos);
  });
}
