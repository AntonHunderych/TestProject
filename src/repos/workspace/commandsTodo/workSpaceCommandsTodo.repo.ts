import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceTodo } from '../../../db/entities/WorkSpace/WorkSpaceTodoEntity';
import { WorkSpaceCommand } from '../../../db/entities/WorkSpace/WorkSpaceCommandEntity';
import { DBError } from '../../../types/Errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IGetWorkSpaceCommandTodoRepo extends IRecreateRepo{
  addCommandToTodo(todoId: string, workSpaceId: string, value: string): Promise<void>;

  removeCommandFromTodo(todoId: string): Promise<void>;
}

export function getWorkSpaceCommandsTodoRepo(db: DataSource| EntityManager): IGetWorkSpaceCommandTodoRepo {

  const workSpaceTodoRepo = db.getRepository<WorkSpaceTodo>(WorkSpaceTodo);

  return {
    async addCommandToTodo(todoId: string, workSpaceId: string, value: string) {
      try {
        const todo = await workSpaceTodoRepo.findOneOrFail({ where: { id: todoId }, relations: { command: true } });
        const command = new WorkSpaceCommand();
        command.value = value;
        command.workSpaceId = workSpaceId;
        todo.command = command;
        await workSpaceTodoRepo.save(todo);
      } catch (error) {
        throw new DBError('Failed to add command to todo', error);
      }
    },
    async removeCommandFromTodo(todoId: string) {
      try {
        const todo = await workSpaceTodoRepo.findOneOrFail({ where: { id: todoId }, relations: { command: true } });
        todo.command = null;
        await workSpaceTodoRepo.save(todo);
      } catch (error) {
        throw new DBError('Failed to remove command from todo', error);
      }
    },
    __recreateFunction: getWorkSpaceCommandsTodoRepo
  };
}