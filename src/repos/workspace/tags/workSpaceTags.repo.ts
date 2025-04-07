import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceTagEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTagEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { WorkSpaceTag, WorkSpaceTagSchema } from '../../../types/entities/WorkSpace/WorkSpaceTagSchema';

export interface IWorkSpaceTagRepo extends IRecreateRepo {
  getTags(userId: string): Promise<WorkSpaceTagEntity[]>;

  createTag(workSpaceId: string, userId: string, value: string): Promise<WorkSpaceTag>;

  updateTag(tagId: string, value: string): Promise<WorkSpaceTag>;

  deleteTag(tagId: string): Promise<void>;
}

export function getWorkSpaceTagRepo(db: DataSource | EntityManager): IWorkSpaceTagRepo {
  const workSpaceTagRepo = db.getRepository<WorkSpaceTagEntity>(WorkSpaceTagEntity);

  return {
    async getTags(workSpaceId: string): Promise<WorkSpaceTagEntity[]> {
      try {
        return await workSpaceTagRepo.find({ where: { workSpaceId } });
      } catch (error) {
        throw new DBError('Failed to get tags', error);
      }
    },
    async createTag(workSpaceId: string, userId: string, value: string): Promise<WorkSpaceTag> {
      try {
        const result = await workSpaceTagRepo
          .createQueryBuilder()
          .insert()
          .values({
            workSpaceId,
            creatorId: userId,
            value,
          })
          .returning('*')
          .execute();
        return WorkSpaceTagSchema.parse(result.generatedMaps[0]);
      } catch (error) {
        throw new DBError('Failed to create tag', error);
      }
    },
    async updateTag(tagId: string, value: string): Promise<WorkSpaceTag> {
      try {
        const result = await workSpaceTagRepo
          .createQueryBuilder()
          .update()
          .set({ value })
          .where('id=:tagId', { tagId })
          .returning('*')
          .execute();
        return WorkSpaceTagSchema.parse(result.raw[0]);
      } catch (error) {
        throw new DBError('Failed to update tag', error);
      }
    },
    async deleteTag(tagId: string): Promise<void> {
      try {
        await workSpaceTagRepo.createQueryBuilder().delete().where('id=:tagId', { tagId }).execute();
      } catch (error) {
        throw new DBError('Failed to delete tag', error);
      }
    },
    __recreateFunction: getWorkSpaceTagRepo,
  };
}
