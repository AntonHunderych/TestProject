import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceTagTodoEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTagTodoEntity';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { DBError } from '../../../types/errors/DBError';

export interface IWorkSpaceTagTodoRepo extends IRecreateRepo {
  addTag(todoId: string, tagId: string, userId: string, workSpaceId: string): Promise<void>;

  removeTag(todoId: string, tagId: string): Promise<void>;
}

export function getWorkSpaceTagTodoRepo(db: DataSource | EntityManager): IWorkSpaceTagTodoRepo {
  const workSpaceTagTodoRepo = db.getRepository(WorkSpaceTagTodoEntity);

  return {
    async addTag(todoId: string, tagId: string, userId: string, workSpaceId: string): Promise<void> {
      try {
        await workSpaceTagTodoRepo
          .createQueryBuilder()
          .insert()
          .values({ todoId, tagId, userId, workSpaceId })
          .execute();
      } catch (error) {
        throw new DBError('Failed to add tag', error);
      }
    },
    async removeTag(todoId: string, tagId: string): Promise<void> {
      try {
        await workSpaceTagTodoRepo
          .createQueryBuilder()
          .delete()
          .where('"todoId"=:todoId', { todoId })
          .andWhere('"tagId"=:tagId', { tagId })
          .execute();
      } catch (error) {
        throw new DBError('Failed to remove tag', error);
      }
    },
    __recreateFunction: getWorkSpaceTagTodoRepo,
  };
}
