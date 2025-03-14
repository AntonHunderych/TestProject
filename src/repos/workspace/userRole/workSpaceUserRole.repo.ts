import { DataSource } from 'typeorm';
import { WorkSpaceRoles } from '../../../db/entities/WorkSpaceRoles';
import { WorkSpaceUser } from '../../../db/entities/WorkSpaceUser';
import { DBError } from '../../../Types/Errors/DBError';

export interface IWorkSpaceUserRoleRepo {
  giveRoleToUser(userId: string, workSpaceId: string, roleValue: string): Promise<WorkSpaceUser>;
  removeRoleFromUser(userId: string, workSpaceId: string, roleValue: string): Promise<WorkSpaceUser>;
  getAllUserRoles(userId: string, workSpaceId: string): Promise<WorkSpaceRoles[]>;
}

export function getWorkSpaceUserRoleRepo(db: DataSource): IWorkSpaceUserRoleRepo {
  const workSpaceRolesRepository = db.getRepository(WorkSpaceRoles);
  const workSpaceUserRepository = db.getRepository(WorkSpaceUser);

  return {
    async giveRoleToUser(userId: string, workSpaceId: string, roleValue: string): Promise<WorkSpaceUser> {
      try {
        const user = await workSpaceUserRepository.findOneOrFail({ where: { userId, workSpaceId }, relations: { roles: true } });
        user.roles = [...(user.roles ? user.roles : []), await workSpaceRolesRepository.findOneOrFail({ where: { name: roleValue } })];
        return await workSpaceUserRepository.save(user);
      } catch (error) {
        throw new DBError('Error giving role to user', error);
      }
    },
    async removeRoleFromUser(userId: string, workSpaceId: string, roleValue: string): Promise<WorkSpaceUser> {
      try {
        const user = await workSpaceUserRepository.findOneOrFail({ where: { userId, workSpaceId }, relations: { roles: true } });
        user.roles = user.roles.filter((role) => role.name !== roleValue);
        return await workSpaceUserRepository.save(user);
      } catch (error) {
        throw new DBError('Error removing role from user', error);
      }
    },
    async getAllUserRoles(userId: string, workSpaceId: string): Promise<WorkSpaceRoles[]> {
      try {
        const user = await workSpaceUserRepository.findOneOrFail({ where: { userId, workSpaceId }, relations: { roles: { permissions: true } } });
        return user.roles;
      } catch (error) {
        throw new DBError('Error fetching all user roles', error);
      }
    }
  };
}