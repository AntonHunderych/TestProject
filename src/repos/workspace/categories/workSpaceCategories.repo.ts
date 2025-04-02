import { WorkSpaceCategoryEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceCategoryEntity';
import { DataSource, EntityManager } from 'typeorm';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IWorkSpaceCategoriesRepo extends IRecreateRepo {
  create(
    workSpaceId: string,
    data: { value: string; description?: string; creatorId: string },
  ): Promise<WorkSpaceCategoryEntity>;
  get(workSpaceId: string): Promise<WorkSpaceCategoryEntity[]>;
  delete(categoryId: string): Promise<void>;
  update(categoryId: string, value?: string, description?: string): Promise<WorkSpaceCategoryEntity>;
}

export function getWorkSpaceCategoryRepo(db: DataSource | EntityManager): IWorkSpaceCategoriesRepo {
  const workSpaceCategoryRepo = db.getRepository(WorkSpaceCategoryEntity);

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
    async update(categoryId: string, value?: string, description?: string): Promise<WorkSpaceCategoryEntity> {
      try {
        const category = await workSpaceCategoryRepo.findOneOrFail({ where: { id: categoryId } });
        Object.assign(category, { value, description });
        return await workSpaceCategoryRepo.save(category);
      } catch (error) {
        throw new DBError('Failed to update categories', error);
      }
    },
    __recreateFunction: getWorkSpaceCategoryRepo,
  };
}
