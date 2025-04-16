import { WorkSpaceFileEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceFileEntity';
import { DataSource, EntityManager } from 'typeorm';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IWorkSpaceFile extends IRecreateRepo {
  createFile(fileName: string, fileType: string, workSpaceId: string): Promise<WorkSpaceFileEntity>;
  getFile(fileName: string, workSpaceId: string): Promise<WorkSpaceFileEntity>;
  deleteFile(fileName: string, workSpaceId: string): Promise<WorkSpaceFileEntity>;
  uploadComplete(fileName: string, workSpaceId: string): Promise<void>;
}

export function getWorkSpaceFileRepo(db: DataSource | EntityManager): IWorkSpaceFile {
  const workSpaceFileRepo = db.getRepository(WorkSpaceFileEntity);

  return {
    async uploadComplete(fileName: string, workSpaceId: string): Promise<void> {
      try {
        await workSpaceFileRepo
          .createQueryBuilder()
          .update()
          .set({ status: 'uploaded' })
          .where('originalName = :fileName', { fileName })
          .andWhere('workSpaceId = :workSpaceId', { workSpaceId })
          .execute();
      } catch (e) {
        throw new DBError('Error set complete status to file', e);
      }
    },
    async createFile(fileName: string, fileType: string, workSpaceId: string): Promise<WorkSpaceFileEntity> {
      try {
        const result = await workSpaceFileRepo
          .createQueryBuilder()
          .insert()
          .values({ originalName: fileName, fileType, workSpaceId })
          .returning('*')
          .execute();
        return result.raw[0];
      } catch (e) {
        throw new DBError('Error creating file', e);
      }
    },
    async getFile(fileName: string, workSpaceId: string): Promise<WorkSpaceFileEntity> {
      try {
        return await workSpaceFileRepo.findOneOrFail({
          where: {
            originalName: fileName,
            workSpaceId,
          },
        });
      } catch (e) {
        throw new DBError('Error getting file', e);
      }
    },
    async deleteFile(fileName: string, workSpaceId: string): Promise<WorkSpaceFileEntity> {
      try {
        const result = await workSpaceFileRepo
          .createQueryBuilder()
          .delete()
          .where('originalName = :fileName', { fileName })
          .andWhere('workSpaceId = :workSpaceId', { workSpaceId })
          .returning('*')
          .execute();
        return result.raw[0];
      } catch (e) {
        throw new DBError('Error deleting file', e);
      }
    },
    __recreateFunction: getWorkSpaceFileRepo,
  };
}
