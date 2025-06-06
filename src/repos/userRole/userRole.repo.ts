import { DataSource, EntityManager } from 'typeorm';
import { DBError } from '../../types/errors/DBError';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';
import { UserRoleEntity } from '../../services/typeorm/entities/UserRoleEntity';
import { RoleEntity } from '../../services/typeorm/entities/RoleEntity';

export interface IUserRoleRepo extends IRecreateRepo {
  getUserRoles(userId: string): Promise<RoleEntity[]>;
  giveRoleToUser(userId: string, roleValue: string): Promise<void>;
  removeRoleFromUser(userID: string, roleValue: string): Promise<void>;
}

export function getUserRoleRepo(db: DataSource | EntityManager): IUserRoleRepo {
  const userRoleRepo = db.getRepository(UserRoleEntity);

  return {
    async getUserRoles(userId: string): Promise<RoleEntity[]> {
      try {
        const userRoles = await userRoleRepo.find({ where: { userId }, relations: { role: true } });
        return userRoles.map((userRole) => userRole.role);
      } catch (error) {
        throw new DBError('Error getting user roles', error);
      }
    },
    async giveRoleToUser(userId: string, roleId: string): Promise<void> {
      try {
        await userRoleRepo.save({ userId, roleId });
      } catch (error) {
        throw new DBError('Error giving role to user', error);
      }
    },
    async removeRoleFromUser(userId: string, roleId: string): Promise<void> {
      try {
        await userRoleRepo.delete({ userId, roleId });
      } catch (error) {
        throw new DBError('Error removing role from user', error);
      }
    },
    __recreateFunction: getUserRoleRepo,
  };
}
