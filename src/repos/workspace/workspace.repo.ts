import { DataSource, EntityManager } from 'typeorm';
import { WorkSpace } from '../../services/typeorm/entities/WorkSpace/WorkSpaceEntity';
import { DBError } from '../../types/errors/DBError';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';
import { IWorkSpace } from '../../types/entities/WorkSpaceSchema';

export interface IWorkSpaceRepos extends IRecreateRepo {
  createWorkSpace(workSpace: IWorkSpaceCreate): Promise<IWorkSpace>;
  getWorkSpaceById(id: string): Promise<IWorkSpace>;
  updateWorkSpace(id: string, workSpace: IWorkSpaceUpdate): Promise<IWorkSpace>;
  deleteWorkSpace(id: string): Promise<boolean>;
  getAllWorkSpaces(): Promise<IWorkSpace[]>;
}

export type IWorkSpaceCreate = Omit<IWorkSpace, 'id'>;
export type IWorkSpaceUpdate = Partial<Omit<IWorkSpace, 'id' | 'creatorId'>>;

export function getWorkSpaceRepos(db: DataSource | EntityManager): IWorkSpaceRepos {
  const WorkSpaceRepos = db.getRepository(WorkSpace);

  return {
    async createWorkSpace(workSpace: IWorkSpaceCreate): Promise<IWorkSpace> {
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
    async getAllWorkSpaces(): Promise<IWorkSpace[]> {
      try {
        return await WorkSpaceRepos.find();
      } catch (error) {
        throw new DBError('Error fetching all workspaces', error);
      }
    },
    async getWorkSpaceById(id: string): Promise<IWorkSpace> {
      try {
        return await WorkSpaceRepos.findOneOrFail({
          where: { id },
          relations: { workSpaceTodos: true, workSpaceUsers: true, workSpaceRoles: true },
        });
      } catch (error) {
        throw new DBError('Error fetching workspace by id', error);
      }
    },
    async updateWorkSpace(id: string, workSpace: IWorkSpaceUpdate): Promise<IWorkSpace> {
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
