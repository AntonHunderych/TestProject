import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceRolesEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceRolesEntity';
import { WorkSpaceUserEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceUserEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IWorkSpaceUserRoleRepo extends IRecreateRepo {
  giveRoleToUser(userId: string, workSpaceId: string, roleValue: string): Promise<WorkSpaceUserEntity>;
  removeRoleFromUser(userId: string, workSpaceId: string, roleValue: string): Promise<WorkSpaceUserEntity>;
  getAllUserRoles(userId: string, workSpaceId: string): Promise<WorkSpaceRolesEntity[]>;
}

export function getWorkSpaceUserRoleRepo(db: DataSource | EntityManager): IWorkSpaceUserRoleRepo {
  const workSpaceRolesRepository = db.getRepository(WorkSpaceRolesEntity);
  const workSpaceUserRepository = db.getRepository(WorkSpaceUserEntity);

  return {
    async giveRoleToUser(userId: string, workSpaceId: string, roleValue: string): Promise<WorkSpaceUserEntity> {
      try {
        const user = await workSpaceUserRepository.findOneOrFail({
          where: { userId, workSpaceId },
          relations: { roles: true },
        });
        user.roles = [
          ...(user.roles ? user.roles : []),
          await workSpaceRolesRepository.findOneOrFail({ where: { name: roleValue } }),
        ];
        return await workSpaceUserRepository.save(user);
      } catch (error) {
        throw new DBError('Error giving role to user', error);
      }
    },
    async removeRoleFromUser(userId: string, workSpaceId: string, roleValue: string): Promise<WorkSpaceUserEntity> {
      try {
        const user = await workSpaceUserRepository.findOneOrFail({
          where: { userId, workSpaceId },
          relations: { roles: true },
        });
        user.roles = user.roles.filter((role) => role.name !== roleValue);
        return await workSpaceUserRepository.save(user);
      } catch (error) {
        throw new DBError('Error removing role from user', error);
      }
    },
    async getAllUserRoles(userId: string, workSpaceId: string): Promise<WorkSpaceRolesEntity[]> {
      try {
        const user = await workSpaceUserRepository.findOneOrFail({
          where: { userId, workSpaceId },
          relations: { roles: { permissions: true } },
        });
        return user.roles;
      } catch (error) {
        throw new DBError('Error fetching all user roles', error);
      }
    },
    __recreateFunction: getWorkSpaceUserRoleRepo,
  };
}
