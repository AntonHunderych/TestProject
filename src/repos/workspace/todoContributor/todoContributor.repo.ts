import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceTodo } from '../../../db/entities/WorkSpace/WorkSpaceTodoEntity';
import { DBError } from '../../../types/Errors/DBError';
import { WorkSpaceUser } from '../../../db/entities/WorkSpace/WorkSpaceUserEntity';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IGetTodoContributorRepo extends IRecreateRepo{
  addContributor(workSpaceId: string, userId: string, todoId: string): Promise<void>;
  deleteContributor(workSpaceId: string, userId: string, todoId: string): Promise<void>;
  getTodoContributor(workSpaceId: string, todoId: string): Promise<WorkSpaceUser[]>;
}

export function getTodoContributorRepo(db: DataSource| EntityManager): IGetTodoContributorRepo {
  const workSpaceTodo = db.getRepository(WorkSpaceTodo);
  const workSpaceUser = db.getRepository(WorkSpaceUser);

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
    async addContributor(workSpaceId: string, userId: string, todoId: string): Promise<any> {
      try {
        const user = await workSpaceUser.findOneOrFail({ where: { workSpaceId, userId } });
        const todo = await workSpaceTodo.findOneOrFail({
          where: { workSpaceId, id: todoId },
          relations: { contributors: true },
        });
        todo.contributors.push(user);
        return await workSpaceTodo.save(todo);
      } catch (error) {
        throw new DBError('Error adding contributor', error);
      }
    },
    async deleteContributor(workSpaceId: string, userId: string, todoId: string): Promise<void> {
      try {
        const user = await workSpaceUser.findOneOrFail({ where: { workSpaceId, userId } });
        const todo = await workSpaceTodo.findOneOrFail({
          where: { workSpaceId, id: todoId },
          relations: { contributors: true },
        });
        todo.contributors = todo.contributors.filter((contributor) => contributor.userId !== user.userId);
        await workSpaceTodo.save(todo);
      } catch (error) {
        throw new DBError('Error deleting contributor', error);
      }
    },
    __recreateFunction: getTodoContributorRepo
  };
}
