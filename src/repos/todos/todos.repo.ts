import { DataSource } from 'typeorm';
import { Todo } from '../../db/entities/TodoEntity';
import { ITodo } from '../../db/schemas/TodoSchema';
import { util } from 'zod';
import Omit = util.Omit;

export interface ITodosRepo {
  create(todo:  Omit<ITodo, "id">): Promise<ITodo>;

  findById(id: string): Promise<ITodo>;

  findAll(): Promise<ITodo[]>;

  update(id: string, todo: Partial<Omit<ITodo, "id">>): Promise<ITodo>;

  delete(id: string): Promise<boolean>;

  findByCreatorId(creatorId:string): Promise<ITodo[]>;
}

export function getTodosRepo(db: DataSource): ITodosRepo{
  const todoRepo = db.getRepository(Todo)
  return{
    create: async (todo: Omit<ITodo, "id">): Promise<ITodo> => {
      return await todoRepo.save(todo);
    },

    findById: async (id: string): Promise<ITodo> => {
      return await todoRepo.findOneOrFail({where:{id}});
    },

    async findByCreatorId(creatorId: string): Promise<ITodo[]> {
      return await todoRepo.find({where: {creatorId:creatorId }})
    },

    findAll: async (): Promise<ITodo[]> => {
      return await todoRepo.find({relations:{creator:true}});
    },

    update: async (id: string, todo: Partial<Omit<ITodo, 'id'>>): Promise<ITodo> => {
      const existingTodo = await todoRepo.findOneBy({ id });

      if (!existingTodo) {
        throw new Error(`Todo with id ${id} not found`);
      }

      Object.assign(existingTodo, todo);

      return await todoRepo.save(existingTodo);
    },

    delete: async (id: string): Promise<boolean> => {
      return  !!await todoRepo.delete(id);
    }
  }
} 