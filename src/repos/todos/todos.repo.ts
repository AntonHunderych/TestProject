import { DataSource } from 'typeorm';
import { Todo } from '../../db/entities/TodoEntity';
import { ITodo } from '../../db/schemas/TodoSchema';
import { DBError } from '../../Types/Errors/DBError';
import { util } from 'zod';
import Omit = util.Omit;

export interface ITodosRepo {
  create(todo: Omit<ITodo, 'id'>): Promise<ITodo>;
  findById(id: string): Promise<ITodo>;
  findAll(): Promise<ITodo[]>;
  update(id: string, todo: Partial<Omit<ITodo, 'id'>>): Promise<ITodo>;
  delete(id: string): Promise<boolean>;
  findByCreatorId(creatorId: string): Promise<ITodo[]>;
}

export function getTodosRepo(db: DataSource): ITodosRepo {
  const todoRepo = db.getRepository(Todo);

  return {
    create: async (todo: Omit<ITodo, 'id'>): Promise<ITodo> => {
      try {
        return await todoRepo.save(todo);
      } catch (error) {
        throw new DBError('Error creating todo', error);
      }
    },

    findById: async (id: string): Promise<ITodo> => {
      try {
        return await todoRepo.findOneOrFail({ where: { id } });
      } catch (error) {
        throw new DBError('Error fetching todo by id', error);
      }
    },

    findByCreatorId: async (creatorId: string): Promise<ITodo[]> => {
      try {
        return await todoRepo.find({ where: { creatorId }, relations: ["tags", "comments"] });
      } catch (error) {
        throw new DBError('Error fetching createdTodos by creator id', error);
      }
    },

    findAll: async (): Promise<ITodo[]> => {
      try {
        return await todoRepo.find({ relations: { creator: true, comments: true, tags: true }});
      } catch (error) {
        throw new DBError('Error fetching all createdTodos', error);
      }
    },

    update: async (id: string, todo: Partial<Omit<ITodo, 'id'>>): Promise<ITodo> => {
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

    delete: async (id: string): Promise<boolean> => {
      try {
        return !!(await todoRepo.delete(id));
      } catch (error) {
        throw new DBError('Error deleting todo', error);
      }
    },
  };
}
