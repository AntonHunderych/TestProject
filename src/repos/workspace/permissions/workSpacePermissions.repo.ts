import { DataSource, EntityManager } from 'typeorm';
import { WorkSpacePermissionsEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpacePermissionsEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IWorkSpacePermissions extends IRecreateRepo {
  getAll(): Promise<WorkSpacePermissionsEntity[]>;
  create(value: string): Promise<WorkSpacePermissionsEntity>;
  delete(id: string): Promise<boolean>;
}

export function getWorkSpacePermissionRepo(db: DataSource | EntityManager): IWorkSpacePermissions {
  const workSpacePermissions = db.getRepository(WorkSpacePermissionsEntity);

  return {
    async create(value: string): Promise<WorkSpacePermissionsEntity> {
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
    async getAll(): Promise<WorkSpacePermissionsEntity[]> {
      try {
        return await workSpacePermissions.find();
      } catch (error) {
        throw new DBError('Error fetching all workspace permissions', error);
      }
    },
    __recreateFunction: getWorkSpacePermissionRepo,
  };
}
