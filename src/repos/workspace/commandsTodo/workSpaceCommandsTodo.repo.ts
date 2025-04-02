import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceTodoEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IGetWorkSpaceCommandTodoRepo extends IRecreateRepo {
  addCommandToTodo(todoId: string, commandId: string): Promise<void>;

  removeCommandFromTodo(todoId: string): Promise<void>;
}

export function getWorkSpaceCommandTodoRepo(db: DataSource | EntityManager): IGetWorkSpaceCommandTodoRepo {
  const workSpaceTodoRepo = db.getRepository(WorkSpaceTodoEntity);

  return {
    async addCommandToTodo(todoId: string, commandId: string): Promise<void> {
      try {
        await workSpaceTodoRepo
          .createQueryBuilder()
          .update()
          .set({ commandId })
          .where('"id"=:todoId', { todoId })
          .execute();
      } catch (error) {
        throw new DBError('Failed to add command to todo', error);
      }
    },
    async removeCommandFromTodo(todoId: string): Promise<void> {
      try {
        await workSpaceTodoRepo
          .createQueryBuilder()
          .update()
          .set({ command: null, commandId: null })
          .where('"id"=:todoId', { todoId })
          .execute();
      } catch (error) {
        throw new DBError('Failed to remove command from todo', error);
      }
    },
    __recreateFunction: getWorkSpaceCommandTodoRepo,
  };
}
