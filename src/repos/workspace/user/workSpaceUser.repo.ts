import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceUserEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceUserEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { WorkSpaceUser, WorkSpaceUserSchema } from '../../../types/entities/WorkSpace/WorkSpaceUserSchema';

export interface IWorkSpaceUserRepo extends IRecreateRepo {
  addUserToWorkSpace(workSpaceId: string, userId: string): Promise<WorkSpaceUser>;
  existUserInWorkSpace(workSpaceId: string, userId: string): Promise<WorkSpaceUserEntity | undefined>;
  deleteUserFromWorkSpace(workSpaceId: string, userId: string): Promise<boolean>;
  getUsersInWorkSpace(workSpaceId: string): Promise<WorkSpaceUserEntity[]>;
  getUserWithWorkSpace(userId: string, workSpaceId: string): Promise<WorkSpaceUserEntity>;
}

export function getWorkSpaceUserRepo(db: DataSource | EntityManager): IWorkSpaceUserRepo {
  const workSpaceUserRepo = db.getRepository(WorkSpaceUserEntity);

  return {
    async addUserToWorkSpace(workSpaceId: string, userId: string): Promise<WorkSpaceUser> {
      try {
        const result = await workSpaceUserRepo
          .createQueryBuilder()
          .insert()
          .values({ workSpaceId, userId })
          .returning('*')
          .execute();
        return WorkSpaceUserSchema.parse(result.generatedMaps[0]);
      } catch (error) {
        throw new DBError('Error adding user to workspace', error);
      }
    },
    async deleteUserFromWorkSpace(workSpaceId: string, userId: string): Promise<boolean> {
      try {
        const result = await workSpaceUserRepo
          .createQueryBuilder()
          .delete()
          .where('"userId"=:userId', { userId })
          .andWhere('"workSpaceId"=:workSpaceId', { workSpaceId })
          .returning('*')
          .execute();
        return !!result.raw[0];
      } catch (error) {
        throw new DBError('Error deleting user from workspace', error);
      }
    },
    async getUsersInWorkSpace(workSpaceId: string): Promise<WorkSpaceUserEntity[]> {
      try {
        return await workSpaceUserRepo.find({
          where: { workSpaceId },
          relations: {
            user: true,
            createdTodos: { contributors: true, tags: { workSpaceTag: true }, comments: true, category: true },
            roles: { role: true },
          },
        });
      } catch (error) {
        throw new DBError('Error fetching users in workspace', error);
      }
    },
    async existUserInWorkSpace(workSpaceId: string, userId: string): Promise<WorkSpaceUserEntity | undefined> {
      try {
        const userInWorkSpace = await workSpaceUserRepo.findOne({
          where: { workSpaceId, userId },
          relations: { roles: { role: { permissions: { permission: true } } } },
        });
        return userInWorkSpace ? userInWorkSpace : undefined;
      } catch (error) {
        throw new DBError('Error checking if user exists in workspace', error);
      }
    },
    async getUserWithWorkSpace(userId: string, workSpaceId: string): Promise<WorkSpaceUserEntity> {
      try {
        return await workSpaceUserRepo.findOneOrFail({
          where: { userId, workSpaceId },
          relations: { user: true, workSpace: true },
        });
      } catch (e) {
        throw new DBError('Error getting user with workspace', e);
      }
    },
    __recreateFunction: getWorkSpaceUserRepo,
  };
}
