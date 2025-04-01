import {
  WorkSpaceCategoryEntity,
  WorkSpaceCategoryConf,
} from '../../../services/typeorm/entities/WorkSpace/WorkSpaceCategoryEntity';
import { DataSource, EntityManager } from 'typeorm';
import { DBError } from '../../../types/errors/DBError';
import { WorkSpaceTodoEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IWorkSpaceCategoriesRepo extends IRecreateRepo {
  create(
    workSpaceId: string,
    data: { value: string; description?: string; creatorId: string },
  ): Promise<WorkSpaceCategoryEntity>;
  get(workSpaceId: string): Promise<WorkSpaceCategoryEntity[]>;
  delete(categoryId: string): Promise<void>;
  getAllCategoryTodos(categoryId: string): Promise<WorkSpaceTodoEntity[]>;
  update(categoryId: string, value?: string, description?: string): Promise<WorkSpaceCategoryEntity>;
  attachTodo(todoId: string, categoryId: string, userId: string): Promise<void>;
  removeTodo(todoId: string): Promise<void>;
}

export function getWorkSpaceCategoryRepo(db: DataSource | EntityManager): IWorkSpaceCategoriesRepo {
  const workSpaceCategoryRepo = db.getRepository(WorkSpaceCategoryEntity);
  const workSpaceCategoryTodoRepo = db.getRepository(WorkSpaceCategoryConf);
  const workSpaceTodoRepo = db.getRepository(WorkSpaceTodoEntity);

  return {
    async create(
      workSpaceId: string,
      data: {
        value: string;
        description?: string;
        creatorId: string;
      },
    ): Promise<WorkSpaceCategoryEntity> {
      try {
        const newCategory = workSpaceCategoryRepo.create({ workSpaceId, ...data });
        return await workSpaceCategoryRepo.save(newCategory);
      } catch (error) {
        throw new DBError('Failed to create categories', error);
      }
    },
    async get(workSpaceId: string): Promise<WorkSpaceCategoryEntity[]> {
      try {
        return await workSpaceCategoryRepo.find({ where: { workSpaceId } });
      } catch (error) {
        throw new DBError('Failed to get categories', error);
      }
    },
    async delete(categoryId: string): Promise<void> {
      try {
        await workSpaceCategoryRepo.delete(categoryId);
      } catch (error) {
        throw new DBError('Failed to delete categories', error);
      }
    },
    async getAllCategoryTodos(categoryId: string): Promise<WorkSpaceTodoEntity[]> {
      try {
        const configs = await workSpaceCategoryTodoRepo.find({ where: { categoryId }, relations: { todos: true } });
        return configs.map((conf) => conf.todos);
      } catch (error) {
        throw new DBError('Failed to get categories', error);
      }
    },
    async update(categoryId: string, value?: string, description?: string): Promise<WorkSpaceCategoryEntity> {
      try {
        const category = await workSpaceCategoryRepo.findOneOrFail({ where: { id: categoryId } });
        Object.assign(category, { value, description });
        return await workSpaceCategoryRepo.save(category);
      } catch (error) {
        throw new DBError('Failed to update categories', error);
      }
    },
    async attachTodo(todoId: string, categoryId: string, userId: string): Promise<void> {
      try {
        await workSpaceCategoryTodoRepo.save({
          todoId,
          categoryId,
          attachedByUserId: userId,
        });
        const todo = await workSpaceTodoRepo.findOneOrFail({ where: { id: todoId } });
        todo.categoryId = categoryId;
        await workSpaceTodoRepo.save(todo);
      } catch (error) {
        throw new DBError('Failed to attach categories', error);
      }
    },
    async removeTodo(todoId: string): Promise<void> {
      try {
        const todo = await workSpaceTodoRepo.findOneOrFail({ where: { id: todoId }, relations: { category: true } });
        await workSpaceTodoRepo.update(todoId, { categoryId: null });
        if (todo.categoryId) {
          await workSpaceCategoryTodoRepo.delete({ todoId, categoryId: todo.categoryId });
        }
      } catch (error) {
        throw new DBError('Failed to detach categories', error);
      }
    },
    __recreateFunction: getWorkSpaceCategoryRepo,
  };
}
