import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceRolesEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceRolesEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { WorkSpaceUserRoleEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceUserRoleEntity';

export interface IWorkSpaceUserRoleRepo extends IRecreateRepo {
  giveRoleToUser(userId: string, workSpaceId: string, roleId: string): Promise<void>;
  removeRoleFromUser(userId: string, workSpaceId: string, roleId: string): Promise<void>;
  getAllUserRoles(userId: string, workSpaceId: string): Promise<WorkSpaceRolesEntity[]>;
}

export function getWorkSpaceUserRoleRepo(db: DataSource | EntityManager): IWorkSpaceUserRoleRepo {
  const workSpaceUserRoleRepo = db.getRepository(WorkSpaceUserRoleEntity);

  return {
    async giveRoleToUser(userId: string, workSpaceId: string, roleId: string): Promise<void> {
      try {
        await workSpaceUserRoleRepo.createQueryBuilder().insert().values({ userId, roleId, workSpaceId }).execute();
      } catch (error) {
        throw new DBError('Error giving role to user', error);
      }
    },
    async removeRoleFromUser(userId: string, workSpaceId: string, roleId: string): Promise<void> {
      try {
        await workSpaceUserRoleRepo
          .createQueryBuilder()
          .delete()
          .where('userId = :userId', { userId })
          .andWhere('workSpaceId = :workSpaceId', { workSpaceId })
          .andWhere('roleId = :roleId', { roleId })
          .execute();
      } catch (error) {
        throw new DBError('Error removing role from user', error);
      }
    },
    async getAllUserRoles(userId: string, workSpaceId: string): Promise<WorkSpaceRolesEntity[]> {
      try {
        const roles = await workSpaceUserRoleRepo.find({
          where: { userId, workSpaceId },
          relations: { role: { permissions: { permission: true } } },
        });
        return roles.map((role) => role.role);
      } catch (error) {
        throw new DBError('Error fetching all user roles', error);
      }
    },
    __recreateFunction: getWorkSpaceUserRoleRepo,
  };
}
