import { DataSource } from 'typeorm';
import { WorkSpaceTodo } from '../../../db/entities/WorkSpaceTodo';
import { DBError } from '../../../Types/Errors/DBError';
import { WorkSpaceUser } from '../../../db/entities/WorkSpaceUser';

export interface IGetTodoContributorRepo {
  addContributor(workSpaceId: string, userId: string, todoId: string): Promise<void>;
  deleteContributor(workSpaceId: string, userId: string, todoId: string): Promise<void>;
  getTodoContributor(workSpaceId: string, todoId: string): Promise<WorkSpaceUser[]>;
}

export function getTodoContributorRepo(db: DataSource): IGetTodoContributorRepo {
  const workSpaceTodo = db.getRepository(WorkSpaceTodo);

  return {
    async getTodoContributor(workSpaceId: string, todoId: string): Promise<WorkSpaceUser[]> {
      try {
        const todo = await workSpaceTodo.findOneOrFail({
          where: { workSpaceId, id: todoId },
          relations: { contributors: true },
        });
        return todo.contributors;
      } catch (error) {
        throw new DBError('Error getting contributors', error);
      }
    },
    async addContributor(workSpaceId: string, userId: string, todoId: string): Promise<void> {
      try {
        const todo = await workSpaceTodo.findOneOrFail({
          where: { workSpaceId, id: todoId },
          relations: { contributors: true },
        });
        Object.assign(todo, { ...todo, contributors: userId });
        await workSpaceTodo.save(todo);
      } catch (error) {
        throw new DBError('Error adding contributor', error);
      }
    },
    async deleteContributor(workSpaceId: string, userId: string, todoId: string): Promise<void> {
      try {
        const todo = await workSpaceTodo.findOneOrFail({
          where: { workSpaceId, id: todoId },
          relations: { contributors: true },
        });
        Object.assign(todo, {
          ...todo,
          contributors: todo.contributors.filter((contributor) => contributor.userId !== userId),
        });
        await workSpaceTodo.save(todo);
      } catch (error) {
        throw new DBError('Error deleting contributor', error);
      }
    },
  };
}
