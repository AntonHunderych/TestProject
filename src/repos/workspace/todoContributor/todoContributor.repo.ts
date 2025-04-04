import { DataSource, EntityManager } from 'typeorm';
import { DBError } from '../../../types/errors/DBError';
import { WorkSpaceUserEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceUserEntity';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { WorkSpaceContributorEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceContributorEntity';

export interface IGetTodoContributorRepo extends IRecreateRepo {
  addContributor(userId: string, workSpaceId: string, todoId: string): Promise<void>;
  deleteContributor(userId: string, workSpaceId: string, todoId: string): Promise<void>;
  getTodoContributor(todoId: string): Promise<WorkSpaceUserEntity[]>;
}

export function getTodoContributorRepo(db: DataSource | EntityManager): IGetTodoContributorRepo {
  const workSpaceContributor = db.getRepository(WorkSpaceContributorEntity);

  return {
    async getTodoContributor(todoId: string): Promise<WorkSpaceUserEntity[]> {
      try {
        const contributors = await workSpaceContributor.find({ where: { todoId }, relations: { user: true } });
        return contributors.map((contr) => contr.user);
      } catch (error) {
        throw new DBError('Error getting contributors', error);
      }
    },
    async addContributor(userId: string, workSpaceId: string, todoId: string): Promise<void> {
      try {
        await workSpaceContributor.createQueryBuilder().insert().values({ userId, todoId, workSpaceId }).execute();
      } catch (error) {
        throw new DBError('Error adding contributor', error);
      }
    },
    async deleteContributor(userId: string, workSpaceId: string, todoId: string): Promise<void> {
      try {
        await workSpaceContributor
          .createQueryBuilder()
          .delete()
          .where('"userId" = :userId', { userId })
          .andWhere('"todoId"=:todoId', { todoId })
          .andWhere('"workSpaceId"=:workSpaceId', { workSpaceId })
          .execute();
      } catch (error) {
        throw new DBError('Error deleting contributor', error);
      }
    },
    __recreateFunction: getTodoContributorRepo,
  };
}
