import { WorkSpaceCategory, WorkSpaceCategoryConf } from '../../../db/entities/WorkSpace/WorkSpaceCategoryEntity';
import { DataSource } from 'typeorm';
import { DBError } from '../../../Types/Errors/DBError';
import { WorkSpaceTodo } from '../../../db/entities/WorkSpace/WorkSpaceTodoEntity';

export function getWorkSpaceCategoriesRepo(db: DataSource) {

  const workSpaceCategoryRepo = db.getRepository(WorkSpaceCategory);
  const workSpaceCategoryTodoRepo = db.getRepository(WorkSpaceCategoryConf);
  const workSpaceTodoRepo = db.getRepository(WorkSpaceTodo);

  return {
    async create(workSpaceId: string, data: { value: string, description?: string, creatorId: string, }): Promise<WorkSpaceCategory> {
      try {
        const newCategory = workSpaceCategoryRepo.create({ workSpaceId: workSpaceId, ...data });
        return await workSpaceCategoryRepo.save(newCategory);
      } catch (error) {
        throw new DBError('Failed to create categories', error);
      }
    },
    async attachTodo(todoId:string, categoryId: string, userId: string): Promise<void> {
      try {
         const conf =  await workSpaceCategoryTodoRepo.save({
            todoId,
            categoryId,
            attachedByUserId: userId
        })
        const todo = await workSpaceTodoRepo.findOneOrFail({where: {id: todoId}})
        todo.category = conf
        await workSpaceTodoRepo.save(todo)
      } catch (error) {
        throw new DBError('Failed to attach categories', error);
      }
    }
  };
}