import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { Permissions } from '../../../types/enum/EPermissions';
import { DBError } from '../../../types/errors/DBError';
import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceRolePermissions } from '../../../types/entities/WorkSpace/WorkSpaceRolePermissionsSchema';
import { WorkSpaceRolePermissionEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceRolePermissionEntity';

export interface IWorkSpaceRolePermissionRepo extends IRecreateRepo {
  updatePermissionOnRoleWithTransactionOnly(roleId: string, permissionsValue: Permissions[]): Promise<void>;
}

export function getWorkSpaceRolePermissionRepo(db: DataSource | EntityManager): IWorkSpaceRolePermissionRepo {
  const workSpaceRolePermissionsRepo = db.getRepository(WorkSpaceRolePermissionEntity);

  return {
    async updatePermissionOnRoleWithTransactionOnly(roleId: string, permissionsValue: Permissions[]): Promise<void> {
      try {
        await workSpaceRolePermissionsRepo
          .createQueryBuilder()
          .delete()
          .where('"roleId" = :roleId', { roleId })
          .execute();

        const newPermissions: WorkSpaceRolePermissions[] = permissionsValue.map((permission: string) => ({
          roleId,
          value: permission,
        }));

        await workSpaceRolePermissionsRepo
          .createQueryBuilder()
          .insert()
          .values(newPermissions)
          .returning('*')
          .execute();
      } catch (e) {
        throw new DBError('Error update permission on role', e);
      }
    },
    __recreateFunction: getWorkSpaceRolePermissionRepo,
  };
}
