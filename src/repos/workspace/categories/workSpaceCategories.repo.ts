import { WorkSpaceCategory, WorkSpaceCategoryConf } from '../../../db/entities/WorkSpace/WorkSpaceCategoryEntity';
import { DataSource } from 'typeorm';
import { DBError } from '../../../Types/Errors/DBError';
import { WorkSpaceTodo } from '../../../db/entities/WorkSpace/WorkSpaceTodoEntity';

export function getWorkSpaceCategoriesRepo(db: DataSource) {

  const workSpaceCategoryRepo = db.getRepository(WorkSpaceCategory);
  const workSpaceCategoryTodoRepo = db.getRepository(WorkSpaceCategoryConf);
  const workSpaceTodoRepo = db.getRepository(WorkSpaceTodo);

  return {
    async create(workSpaceId: string, data: {
      value: string,
      description?: string,
      creatorId: string,
    }): Promise<WorkSpaceCategory> {
      try {
        const newCategory = workSpaceCategoryRepo.create({ workSpaceId: workSpaceId, ...data });
        return await workSpaceCategoryRepo.save(newCategory);
      } catch (error) {
        throw new DBError('Failed to create categories', error);
      }
    },
    async get(workSpaceId: string): Promise<WorkSpaceCategory[]> {
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
    async getAllCategoryTodos(categoryId: string): Promise<WorkSpaceTodo[]> {
      try {
        const configs = await workSpaceCategoryTodoRepo.find({ where: { categoryId }, relations: {todos:true} });
        return configs.map(conf => conf.todos);
      } catch (error) {
        throw new DBError('Failed to get categories', error);
      }
    },
    async update(categoryId: string, value?: string, description?: string): Promise<WorkSpaceCategory> {
      try {
        const category = await workSpaceCategoryRepo.findOneOrFail({ where: { id: categoryId } });
        Object.assign(category, { value: value, description: description });
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
          attachedByUserId: userId
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
          await workSpaceCategoryTodoRepo.delete({ todoId: todoId, categoryId: todo.categoryId });
        }
      } catch (error) {
        throw new DBError('Failed to detach categories', error);
      }
    }
  };
}