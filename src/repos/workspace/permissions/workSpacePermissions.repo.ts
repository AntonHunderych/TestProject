import { DataSource, EntityManager } from 'typeorm';
import { WorkSpacePermissionsEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpacePermissionsEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { WorkSpacePermissionsSchema } from '../../../types/entities/WorkSpace/WorkSpacePermissionsSchema';

export interface IWorkSpacePermissions extends IRecreateRepo {
  getAll(): Promise<WorkSpacePermissionsEntity[]>;
  createPermission(value: string): Promise<WorkSpacePermissionsEntity>;
  deletePermission(id: string): Promise<boolean>;
}

export function getWorkSpacePermissionRepo(db: DataSource | EntityManager): IWorkSpacePermissions {
  const workSpacePermissions = db.getRepository(WorkSpacePermissionsEntity);

  return {
    async createPermission(value: string): Promise<WorkSpacePermissionsEntity> {
      try {
        const result = await workSpacePermissions
          .createQueryBuilder()
          .insert()
          .values({ value })
          .returning('*')
          .execute();
        return WorkSpacePermissionsSchema.parse(result.generatedMaps[0]);
      } catch (error) {
        throw new DBError('Error creating workspace permission', error);
      }
    },
    async deletePermission(id: string): Promise<boolean> {
      try {
        const result = await workSpacePermissions.createQueryBuilder().delete().where('id=:id', { id }).execute();
        return !!result.raw[0];
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
