import { DataSource } from 'typeorm';
import { WorkSpaceTodo } from '../../../db/entities/WorkSpaceTodo';

export interface IWsTodoRepo {
  create(todo: Partial<WorkSpaceTodo>): Promise<WorkSpaceTodo>;
}

export function getWorkSpaceTodoRepo(db:DataSource): IWsTodoRepo{

  const wsTodoRepo = db.getRepository(WorkSpaceTodo)

  return {
    async create(todo: Partial<WorkSpaceTodo>): Promise<WorkSpaceTodo>{
      return await wsTodoRepo.save(todo)
    }
  }
}