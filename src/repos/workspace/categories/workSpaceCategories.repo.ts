import { WorkSpaceCategoryEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceCategoryEntity';
import { DataSource, EntityManager } from 'typeorm';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { IWorkSpaceCategory, WorkSpaceCategorySchema } from '../../../types/entities/WorkSpace/WorkSpaceCategorySchema';

export interface IWorkSpaceCategoriesRepo extends IRecreateRepo {
  create(data: {
    workSpaceId: string;
    value: string;
    description?: string;
    creatorId: string;
  }): Promise<IWorkSpaceCategory>;
  get(workSpaceId: string): Promise<WorkSpaceCategoryEntity[]>;
  delete(categoryId: string): Promise<void>;
  update(categoryId: string, value?: string, description?: string): Promise<IWorkSpaceCategory>;
}

export function getWorkSpaceCategoryRepo(db: DataSource | EntityManager): IWorkSpaceCategoriesRepo {
  const workSpaceCategoryRepo = db.getRepository(WorkSpaceCategoryEntity);

  return {
    async create(data: {
      workSpaceId: string;
      value: string;
      description?: string;
      creatorId: string;
    }): Promise<IWorkSpaceCategory> {
      try {
        const result = await workSpaceCategoryRepo.createQueryBuilder().insert().values(data).returning('*').execute();
        return WorkSpaceCategorySchema.parse(result.generatedMaps[0]);
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
        await workSpaceCategoryRepo.createQueryBuilder().delete().where('id=:categoryId', { categoryId }).execute();
      } catch (error) {
        throw new DBError('Failed to delete categories', error);
      }
    },
    async update(categoryId: string, value?: string, description?: string): Promise<IWorkSpaceCategory> {
      try {
        const result = await workSpaceCategoryRepo
          .createQueryBuilder()
          .update()
          .set({ id: categoryId, value, description })
          .where('id=:categoryId', { categoryId })
          .returning('*')
          .execute();
        return WorkSpaceCategorySchema.parse(result.raw[0]);
      } catch (error) {
        throw new DBError('Failed to update categories', error);
      }
    },
    __recreateFunction: getWorkSpaceCategoryRepo,
  };
}
