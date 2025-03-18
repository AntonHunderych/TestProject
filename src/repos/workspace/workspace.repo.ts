import { DataSource } from 'typeorm';
import { WorkSpace } from '../../db/entities/WorkSpaceEntity';
import { IWorkspace } from '../../db/schemas/WorkSpaceSchema';
import { DBError } from '../../Types/Errors/DBError';

export interface IWorkSpaceRepos {
  createWorkSpace(workSpace: IWorkSpaceCreate): Promise<IWorkspace>;
  getWorkSpaceById(id: string): Promise<IWorkspace>;
  updateWorkSpace(id: string, workSpace: IWorkSpaceUpdate): Promise<IWorkspace>;
  deleteWorkSpace(id: string): Promise<boolean>;
  getAllWorkSpaces(): Promise<IWorkspace[]>;
}

export type IWorkSpaceCreate = Omit<IWorkspace, 'id'>;
export type IWorkSpaceUpdate = Partial<Omit<IWorkspace, 'id' | 'creatorId'>>;

export function getWorkSpaceRepos(db: DataSource): IWorkSpaceRepos {
  const WorkSpaceRepos = db.getRepository(WorkSpace);

  return {
    async createWorkSpace(workSpace: IWorkSpaceCreate): Promise<IWorkspace> {
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
    async getAllWorkSpaces(): Promise<IWorkspace[]> {
      try {
        return await WorkSpaceRepos.find();
      } catch (error) {
        throw new DBError('Error fetching all workspaces', error);
      }
    },
    async getWorkSpaceById(id: string): Promise<IWorkspace> {
      try {
        return await WorkSpaceRepos.findOneOrFail({
          where: { id },
          relations: { workSpaceTodos: true, workSpaceUsers: true, workSpaceRoles: true },
        });
      } catch (error) {
        throw new DBError('Error fetching workspace by id', error);
      }
    },
    async updateWorkSpace(id: string, workSpace: IWorkSpaceUpdate): Promise<IWorkspace> {
      try {
        const _workSpace = await WorkSpaceRepos.findOneOrFail({ where: { id } });
        Object.assign(_workSpace, workSpace);
        return await WorkSpaceRepos.save(_workSpace);
      } catch (error) {
        throw new DBError('Error updating workspace', error);
      }
    },
  };
}
