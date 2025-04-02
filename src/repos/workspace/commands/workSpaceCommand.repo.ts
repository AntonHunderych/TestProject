import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceCommandEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceCommandEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IWorkSpaceCommandsRepo extends IRecreateRepo {
  create(workSpaceId: string, value: string): Promise<WorkSpaceCommandEntity>;

  getAll(workSpaceId: string): Promise<WorkSpaceCommandEntity[]>;

  delete(workSpaceId: string, value: string): Promise<void>;
}

export function getWorkSpaceCommandRepo(db: DataSource | EntityManager): IWorkSpaceCommandsRepo {
  const workSpaceCommandRepo = db.getRepository<WorkSpaceCommandEntity>(WorkSpaceCommandEntity);

  return {
    async create(workSpaceId: string, value: string): Promise<WorkSpaceCommandEntity> {
      try {
        return await workSpaceCommandRepo.save({ workSpaceId, value });
      } catch (error) {
        throw new DBError('Error creating workspace command', error);
      }
    },
    async getAll(workSpaceId: string): Promise<WorkSpaceCommandEntity[]> {
      try {
        return await workSpaceCommandRepo.find({ where: { workSpaceId } });
      } catch (error) {
        throw new DBError('Error fetching all workspace commands', error);
      }
    },
    async delete(workSpaceId: string, value: string): Promise<void> {
      try {
        await workSpaceCommandRepo.delete({ workSpaceId, value });
      } catch (error) {
        throw new DBError('Error deleting workspace command', error);
      }
    },
    __recreateFunction: getWorkSpaceCommandRepo,
  };
}
