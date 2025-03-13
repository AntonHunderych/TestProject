import { DataSource } from 'typeorm';
import { WorkSpacePermissions } from '../../../db/entities/WorkSpacePermissions';

export interface IWorkSpacePermissions {
  getAll(): Promise<WorkSpacePermissions[]>;
  create(value: string): Promise<WorkSpacePermissions>;
  delete(id:string): Promise<boolean>;
}

export function getWorkSpacePermissionsRepo (db: DataSource):IWorkSpacePermissions {

  const workSpacePermissions = db.getRepository(WorkSpacePermissions);

  return{
    async create(value: string): Promise<WorkSpacePermissions> {
      return await workSpacePermissions.save({value})
    },
    async delete(id: string): Promise<boolean> {
      return !!await workSpacePermissions.delete(id);
    },
    async getAll(): Promise<WorkSpacePermissions[]> {
      return await workSpacePermissions.find();
    }
  }
}