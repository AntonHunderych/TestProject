import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceRolesEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceRolesEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { IWorkSpaceRole, WorkSpaceRoleSchema } from '../../../types/entities/WorkSpace/WorkSpaceRolesSchema';

export interface IWorkSpaceRoleRepo extends IRecreateRepo {
  createRole(workSpaceId: string, name: string): Promise<IWorkSpaceRole>;
  deleteRole(roleId: string): Promise<boolean>;
}

export function getWorkSpaceRoleRepo(db: DataSource | EntityManager): IWorkSpaceRoleRepo {
  const workSpaceRolesRepo = db.getRepository(WorkSpaceRolesEntity);

  return {
    async createRole(workSpaceId: string, name: string): Promise<IWorkSpaceRole> {
      try {
        const result = await workSpaceRolesRepo
          .createQueryBuilder()
          .insert()
          .values({ workSpaceId, name })
          .returning('*')
          .execute();
        return WorkSpaceRoleSchema.parse(result.generatedMaps[0]);
      } catch (error) {
        throw new DBError('Error creating workspace role', error);
      }
    },
    async deleteRole(roleId: string): Promise<boolean> {
      try {
        return !!(
          await workSpaceRolesRepo.createQueryBuilder().delete().where('id=:id', { roleId }).returning('*').execute()
        ).raw[0];
      } catch (error) {
        throw new DBError('Error deleting workspace role', error);
      }
    },
    __recreateFunction: getWorkSpaceRoleRepo,
  };
}
