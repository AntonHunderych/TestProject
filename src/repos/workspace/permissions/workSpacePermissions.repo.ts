import { DataSource, EntityManager } from 'typeorm';
import { WorkSpacePermissions } from '../../../db/entities/WorkSpace/WorkSpacePermissionsEntity';
import { DBError } from '../../../types/Errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IWorkSpacePermissions extends IRecreateRepo {
  getAll(): Promise<WorkSpacePermissions[]>;
  create(value: string): Promise<WorkSpacePermissions>;
  delete(id: string): Promise<boolean>;
}

export function getWorkSpacePermissionsRepo(db: DataSource | EntityManager): IWorkSpacePermissions {
  const workSpacePermissions = db.getRepository(WorkSpacePermissions);

  return {
    async create(value: string): Promise<WorkSpacePermissions> {
      try {
        return await workSpacePermissions.save({ value });
      } catch (error) {
        throw new DBError('Error creating workspace permission', error);
      }
    },
    async delete(id: string): Promise<boolean> {
      try {
        return !!(await workSpacePermissions.delete(id));
      } catch (error) {
        throw new DBError('Error deleting workspace permission', error);
      }
    },
    async getAll(): Promise<WorkSpacePermissions[]> {
      try {
        return await workSpacePermissions.find();
      } catch (error) {
        throw new DBError('Error fetching all workspace permissions', error);
      }
    },
    __recreateFunction: getWorkSpacePermissionsRepo,
  };
}
