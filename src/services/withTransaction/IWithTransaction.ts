import { IRepos } from '../../repos';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';

export interface IWithTransaction {
  <T extends { [K in keyof IRepos]?: IRecreateRepo }, R>(inputRepos: T, callback: (repos: T) => Promise<R>): Promise<R>;
}
