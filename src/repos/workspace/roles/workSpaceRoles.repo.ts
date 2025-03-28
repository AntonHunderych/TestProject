import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceRoles } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceRolesEntity';
import { Permissions } from '../../../types/enum/PermisionsEnum';
import { WorkSpacePermissions } from '../../../services/typeorm/entities/WorkSpace/WorkSpacePermissionsEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IWorkSpaceRolesRepo extends IRecreateRepo {
  create(workSpaceId: string, name: string): Promise<WorkSpaceRoles>;
  delete(workSpaceId: string, name: string): Promise<boolean>;
  getAll(): Promise<WorkSpaceRoles[]>;
  getWorkSpaceRoles(workSpaceId: string): Promise<WorkSpaceRoles[]>;
  updatePermissionOnRole(workSpaceId: string, name: string, permissionsValue: Permissions[]): Promise<WorkSpaceRoles>;
}

export function getWorkSpaceRoleRepo(db: DataSource | EntityManager): IWorkSpaceRolesRepo {
  const workSpaceRolesRepo = db.getRepository(WorkSpaceRoles);
  const workSpacePermissions = db.getRepository(WorkSpacePermissions);

  return {
    async getAll(): Promise<WorkSpaceRoles[]> {
      try {
        return await workSpaceRolesRepo.find();
      } catch (error) {
        throw new DBError('Error fetching all workspace roles', error);
      }
    },
    async getWorkSpaceRoles(workSpaceId: string): Promise<WorkSpaceRoles[]> {
      try {
        return await workSpaceRolesRepo.find({ where: { workSpaceId } });
      } catch (error) {
        throw new DBError('Error fetching workspace roles by workspace ID', error);
      }
    },
    async create(workSpaceId: string, name: string): Promise<WorkSpaceRoles> {
      try {
        return await workSpaceRolesRepo.save({ name, workSpaceId });
      } catch (error) {
        throw new DBError('Error creating workspace role', error);
      }
    },
    async delete(workSpaceId: string, name: string): Promise<boolean> {
      try {
        return !!(await workSpaceRolesRepo.delete([name, workSpaceId]));
      } catch (error) {
        throw new DBError('Error deleting workspace role', error);
      }
    },
    async updatePermissionOnRole(
      workSpaceId: string,
      name: string,
      permissionsValue: Permissions[],
    ): Promise<WorkSpaceRoles> {
      try {
        const permissions = await Promise.all(
          permissionsValue.map((value) => workSpacePermissions.findOneOrFail({ where: { value } })),
        );

        const role = await workSpaceRolesRepo.findOneOrFail({
          where: { workSpaceId, name },
          relations: { permissions: true },
        });

        role.permissions = permissions;
        return await workSpaceRolesRepo.save(role);
      } catch (error) {
        throw new DBError('Error updating permissions on workspace role', error);
      }
    },
    __recreateFunction: getWorkSpaceRoleRepo,
  };
}
