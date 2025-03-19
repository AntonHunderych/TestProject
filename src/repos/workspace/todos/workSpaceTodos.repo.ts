import { DataSource } from 'typeorm';
import { WorkSpaceTodo } from '../../../db/entities/WorkSpace/WorkSpaceTodoEntity';
import { ITodo } from '../../../db/schemas/TodoSchema';
import { DBError } from '../../../Types/Errors/DBError';

export interface IWsTodoRepo {
  create(todo: Partial<WorkSpaceTodo>, workSpaceId: string, creatorId: string): Promise<WorkSpaceTodo>;
  findById(id: string): Promise<WorkSpaceTodo>;
  findAll(): Promise<WorkSpaceTodo[]>;
  findAllTodoInWorkSpace(workSpaceId: string): Promise<WorkSpaceTodo[]>;
  update(id: string, todo: Partial<WorkSpaceTodo>): Promise<WorkSpaceTodo>;
  delete(id: string): Promise<boolean>;
}

export function getWorkSpaceTodoRepo(db: DataSource): IWsTodoRepo {
  const wsTodoRepo = db.getRepository(WorkSpaceTodo);

  return {
    async create(todo: Partial<WorkSpaceTodo>, workSpaceId: string, creatorId: string): Promise<WorkSpaceTodo> {
      try {
        return await wsTodoRepo.save({
          workSpaceId,
          creatorId,
          ...todo,
        });
      } catch (error) {
        throw new DBError('Error creating workspace todo', error);
      }
    },

    async findById(id: string): Promise<WorkSpaceTodo> {
      try {
        return await wsTodoRepo.findOneOrFail({ where: { id }, relations: { creator: true } });
      } catch (error) {
        throw new DBError('Error fetching workspace todo by id', error);
      }
    },

    async findAllTodoInWorkSpace(workSpaceId: string): Promise<WorkSpaceTodo[]> {
      try {
        return await wsTodoRepo.find({ where: { workSpaceId }, relations: {creator:true, comments:true, contributors:true, tags: true} });
      } catch (error) {
        throw new DBError('Error fetching all createdTodos in workspace', error);
      }
    },

    async findAll(): Promise<WorkSpaceTodo[]> {
      try {
        return await wsTodoRepo.find();
      } catch (error) {
        throw new DBError('Error fetching all workspace createdTodos', error);
      }
    },

    async update(id: string, todo: Partial<Omit<ITodo, 'id'>>): Promise<WorkSpaceTodo> {
      try {
        await wsTodoRepo.update(id, todo);
        return await wsTodoRepo.findOneByOrFail({ id });
      } catch (error) {
        throw new DBError('Error updating workspace todo', error);
      }
    },

    async delete(id: string): Promise<boolean> {
      try {
        return !!(await wsTodoRepo.delete(id));
      } catch (error) {
        throw new DBError('Error deleting workspace todo', error);
      }
    },
  };
}
