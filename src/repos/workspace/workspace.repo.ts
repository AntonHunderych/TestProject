import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceEntity } from '../../services/typeorm/entities/WorkSpace/WorkSpaceEntity';
import { DBError } from '../../types/errors/DBError';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';
import { WorkSpace } from '../../types/entities/WorkSpace/WorkSpaceSchema';

export interface IWorkSpaceRepos extends IRecreateRepo {
  createWorkSpace(workSpace: IWorkSpaceCreate): Promise<WorkSpace>;
  getWorkSpaceById(id: string): Promise<WorkSpace>;
  updateWorkSpace(id: string, workSpace: IWorkSpaceUpdate): Promise<WorkSpace>;
  deleteWorkSpace(id: string): Promise<boolean>;
  getAllWorkSpaces(): Promise<WorkSpace[]>;
}

export type IWorkSpaceCreate = Omit<WorkSpace, 'id'>;
export type IWorkSpaceUpdate = Partial<Omit<WorkSpace, 'id' | 'creatorId'>>;

export function getWorkSpaceRepos(db: DataSource | EntityManager): IWorkSpaceRepos {
  const WorkSpaceRepos = db.getRepository(WorkSpaceEntity);

  return {
    async createWorkSpace(workSpace: IWorkSpaceCreate): Promise<WorkSpace> {
      try {
        return await WorkSpaceRepos.save(workSpace);
      } catch (error) {
        throw new DBError('Error creating workspace', error);
      }
    },
    async deleteWorkSpace(id: string): Promise<boolean> {
      try {
        return !!(await WorkSpaceRepos.delete({ id }));
      } catch (error) {
        throw new DBError('Error deleting workspace', error);
      }
    },
    async getAllWorkSpaces(): Promise<WorkSpace[]> {
      try {
        return await WorkSpaceRepos.find();
      } catch (error) {
        throw new DBError('Error fetching all workspaces', error);
      }
    },
    async getWorkSpaceById(id: string): Promise<WorkSpace> {
      try {
        return await WorkSpaceRepos.findOneOrFail({
          where: { id },
          relations: { todos: true, users: true, roles: true },
        });
      } catch (error) {
        throw new DBError('Error fetching workspace by id', error);
      }
    },
    async updateWorkSpace(id: string, workSpace: IWorkSpaceUpdate): Promise<WorkSpace> {
      try {
        const _workSpace = await WorkSpaceRepos.findOneOrFail({ where: { id } });
        Object.assign(_workSpace, workSpace);
        return await WorkSpaceRepos.save(_workSpace);
      } catch (error) {
        throw new DBError('Error updating workspace', error);
      }
    },
    __recreateFunction: getWorkSpaceRepos,
  };
}
