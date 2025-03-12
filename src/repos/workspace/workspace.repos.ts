import { DataSource } from 'typeorm';
import { WorkSpace } from '../../db/entities/WorkSpaceEntity';
import { IWorkspace } from '../../db/schemas/WorkSpaceSchema';


export interface IWorkSpaceRepos  {

  createWorkSpace(workSpace: IWorkSpaceCreate): Promise<IWorkspace>;

  getWorkSpaceById(id: string): Promise<IWorkspace>;

  updateWorkSpace(id: string, workSpace: IWorkSpaceUpdate): Promise<IWorkspace>;

  deleteWorkSpace(id: string): Promise<boolean>;

  getAllWorkSpaces(): Promise<IWorkspace[]>;

}

export type IWorkSpaceCreate = Omit<IWorkspace, "id">;
export type IWorkSpaceUpdate = Partial<Omit<IWorkspace, "id"|"creatorId">>;

export function getWorkSpaceRepos(db : DataSource): IWorkSpaceRepos {
   
  const WorkSpaceRepos = db.getRepository(WorkSpace);

  return {
    async createWorkSpace(workSpace: IWorkSpaceCreate): Promise<IWorkspace> {
      return await WorkSpaceRepos.save(workSpace);
    },
    async deleteWorkSpace(id: string): Promise<boolean> {
      return !!await WorkSpaceRepos.delete({id});
    },
    async getAllWorkSpaces(): Promise<IWorkspace[]> {
      return await WorkSpaceRepos.find();
    },
    async getWorkSpaceById(id: string): Promise<IWorkspace> {
      return await WorkSpaceRepos.findOneOrFail(
        {
          where: {
            id
          }
        });
    },
    async updateWorkSpace(id: string, workSpace: IWorkSpaceUpdate): Promise<IWorkspace> {
      const _workSpace = await WorkSpaceRepos.findOneOrFail({where: {id}});
      Object.assign(_workSpace, workSpace);
      return await WorkSpaceRepos.save(_workSpace);
    }

  }
  
}