import { DataSource, EntityManager } from 'typeorm';
import { Todo } from '../../db/entities/TodoEntity';
import { ITodo } from '../../db/schemas/TodoSchema';
import { DBError } from '../../types/Errors/DBError';
import { util } from 'zod';
import Omit = util.Omit;
import { IRecreateRepo } from '../../types/IRecreatebleRepo';

export interface ITodosRepo extends IRecreateRepo {
  create(todo: Omit<ITodo, 'id'>): Promise<ITodo>;

  findById(id: string): Promise<ITodo>;

  findAll(): Promise<ITodo[]>;

  update(id: string, todo: Partial<Omit<ITodo, 'id'>>): Promise<ITodo>;

  delete(id: string): Promise<boolean>;

  findByCreatorId(creatorId: string): Promise<ITodo[]>;
}

export function getTodoRepo(db: DataSource | EntityManager): ITodosRepo {
  const todoRepo = db.getRepository(Todo);

  return {
    async create(todo: Omit<ITodo, 'id'>): Promise<ITodo> {
      try {
        return await todoRepo.save(todo);
      } catch (error) {
        throw new DBError('Error creating todo', error);
      }
    },

    async findById(id: string): Promise<ITodo> {
      try {
        return await todoRepo.findOneOrFail({ where: { id } });
      } catch (error) {
        throw new DBError('Error fetching todo by id', error);
      }
    },

    async findByCreatorId(creatorId: string): Promise<ITodo[]> {
      try {
        return await todoRepo.find({ where: { creatorId }, relations: ['tags', 'comments'] });
      } catch (error) {
        throw new DBError('Error fetching createdTodos by creator id', error);
      }
    },

    async findAll(): Promise<ITodo[]> {
      try {
        return await todoRepo.find({ relations: { creator: true, comments: true, tags: true } });
      } catch (error) {
        throw new DBError('Error fetching all createdTodos', error);
      }
    },

    async update(id: string, todo: Partial<Omit<ITodo, 'id'>>): Promise<ITodo> {
      try {
        const existingTodo = await todoRepo.findOneBy({ id });
        if (!existingTodo) {
          throw new DBError(`Todo with id ${id} not found`);
        }
        Object.assign(existingTodo, todo);
        return await todoRepo.save(existingTodo);
      } catch (error) {
        throw new DBError('Error updating todo', error);
      }
    },

    async delete(id: string): Promise<boolean> {
      try {
        return !!(await todoRepo.delete(id));
      } catch (error) {
        throw new DBError('Error deleting todo', error);
      }
    },
    __recreateFunction: getTodoRepo,
  };
}
