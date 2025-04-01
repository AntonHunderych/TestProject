import { DataSource, EntityManager } from 'typeorm';
import { TodoEntity } from '../../services/typeorm/entities/TodoEntity';
import { DBError } from '../../types/errors/DBError';
import { util } from 'zod';
import Omit = util.Omit;
import { IRecreateRepo } from '../../types/IRecreatebleRepo';
import { Todo } from '../../types/entities/TodoSchema';

export interface ITodosRepo extends IRecreateRepo {
  create(todo: Omit<Todo, 'id'>): Promise<Todo>;

  findById(id: string): Promise<Todo>;

  findAll(): Promise<Todo[]>;

  update(id: string, todo: Partial<Omit<Todo, 'id'>>): Promise<Todo>;

  delete(id: string): Promise<boolean>;

  findByCreatorId(creatorId: string): Promise<Todo[]>;
}

export function getTodoRepo(db: DataSource | EntityManager): ITodosRepo {
  const todoRepo = db.getRepository(TodoEntity);

  return {
    async create(todo: Omit<Todo, 'id'>): Promise<Todo> {
      try {
        return await todoRepo.save(todo);
      } catch (error) {
        throw new DBError('Error creating todo', error);
      }
    },

    async findById(id: string): Promise<Todo> {
      try {
        return await todoRepo.findOneOrFail({ where: { id } });
      } catch (error) {
        throw new DBError('Error fetching todo by id', error);
      }
    },

    async findByCreatorId(creatorId: string): Promise<Todo[]> {
      try {
        return await todoRepo.find({
          where: { creatorId },
          relations: { comments: true, creator: true, tags: { tag: true } },
        });
      } catch (error) {
        throw new DBError('Error fetching createdTodos by creator id', error);
      }
    },

    async findAll(): Promise<Todo[]> {
      try {
        return await todoRepo.find({ relations: { creator: true, comments: true, tags: { tag: true } } });
      } catch (error) {
        throw new DBError('Error fetching all createdTodos', error);
      }
    },

    async update(id: string, todo: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
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
