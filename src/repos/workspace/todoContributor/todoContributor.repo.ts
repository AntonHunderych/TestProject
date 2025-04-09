import { DataSource, EntityManager } from 'typeorm';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { WorkSpaceContributorEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceContributorEntity';

export interface ITodoContributorRepo extends IRecreateRepo {
  addContributor(userId: string, todoId: string): Promise<void>;
  deleteContributor(userId: string, todoId: string): Promise<void>;
  getTodoContributor(todoId: string, workSpaceUserId: string): Promise<WorkSpaceContributorEntity>;
}

export function getTodoContributorRepo(db: DataSource | EntityManager): ITodoContributorRepo {
  const workSpaceContributor = db.getRepository(WorkSpaceContributorEntity);

  return {
    async getTodoContributor(todoId: string, workSpaceUserId: string): Promise<WorkSpaceContributorEntity> {
      try {
        return await workSpaceContributor.findOneOrFail({
          where: { todoId, userId: workSpaceUserId },
          relations: { user: true, todo: true },
        });
      } catch (error) {
        throw new DBError('Error getting contributors', error);
      }
    },
    async addContributor(userId: string, todoId: string): Promise<void> {
      try {
        await workSpaceContributor.createQueryBuilder().insert().values({ userId, todoId }).execute();
      } catch (error) {
        throw new DBError('Error adding contributor', error);
      }
    },
    async deleteContributor(userId: string, todoId: string): Promise<void> {
      try {
        await workSpaceContributor
          .createQueryBuilder()
          .delete()
          .where('"userId" = :userId', { userId })
          .andWhere('"todoId"=:todoId', { todoId })
          .execute();
      } catch (error) {
        throw new DBError('Error deleting contributor', error);
      }
    },
    __recreateFunction: getTodoContributorRepo,
  };
}
