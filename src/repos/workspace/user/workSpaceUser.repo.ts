import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceUserEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceUserEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { WorkSpace } from '../../../types/entities/WorkSpace/WorkSpaceSchema';

export interface IWorkSpaceUserRepo extends IRecreateRepo {
  addUserToWorkSpace(workSpaceId: string, userId: string): Promise<WorkSpaceUserEntity>;
  getUserAllWorkSpaces(id: string): Promise<WorkSpace[]>;
  getAllCreatedWorkSpaces(id: string): Promise<WorkSpace[]>;
  existUserInWorkSpace(workSpaceId: string, userId: string): Promise<WorkSpaceUserEntity | undefined>;
  deleteUserFromWorkSpace(workSpaceId: string, userId: string): Promise<boolean>;
  getUserInWorkSpace(workSpaceId: string): Promise<WorkSpaceUserEntity[]>;
}

export function getWorkSpaceUserRepo(db: DataSource | EntityManager): IWorkSpaceUserRepo {
  const workSpaceUserRepo = db.getRepository(WorkSpaceUserEntity);

  return {
    async addUserToWorkSpace(workSpaceId: string, userId: string): Promise<WorkSpaceUserEntity> {
      try {
        const existingUser = await workSpaceUserRepo.findOne({
          where: { workSpaceId, userId },
        });

        if (existingUser) {
          return existingUser;
        }

        const newWorkSpaceUser = workSpaceUserRepo.create({
          userId,
          workSpaceId,
        });

        return await workSpaceUserRepo.save(newWorkSpaceUser);
      } catch (error) {
        throw new DBError('Error adding user to workspace', error);
      }
    },
    async deleteUserFromWorkSpace(workSpaceId: string, userId: string): Promise<boolean> {
      try {
        return !!(await workSpaceUserRepo.delete({ workSpaceId, userId }));
      } catch (error) {
        throw new DBError('Error deleting user from workspace', error);
      }
    },
    async getUserInWorkSpace(workSpaceId: string): Promise<WorkSpaceUserEntity[]> {
      try {
        return await workSpaceUserRepo.find({
          where: { workSpaceId },
          relations: { user: true, roles: true, createdTodos: true },
        });
      } catch (error) {
        throw new DBError('Error fetching users in workspace', error);
      }
    },
    async getUserAllWorkSpaces(id: string): Promise<WorkSpace[]> {
      try {
        const user = await workSpaceUserRepo.find({
          where: { userId: id },
          relations: { workSpace: true },
        });
        return user.map((wsUser) => wsUser.workSpace);
      } catch (error) {
        throw new DBError('Error fetching all workspaces for user', error);
      }
    },
    async getAllCreatedWorkSpaces(id: string): Promise<WorkSpace[]> {
      try {
        const user = await workSpaceUserRepo.find({
          where: { userId: id },
          relations: { workSpace: true },
        });
        return user.map((wsUser) => wsUser.workSpace).filter((workSpace) => workSpace?.creatorId === id);
      } catch (error) {
        throw new DBError('Error fetching all created workspaces for user', error);
      }
    },
    async existUserInWorkSpace(workSpaceId: string, userId: string): Promise<WorkSpaceUserEntity | undefined> {
      try {
        const usersInWorkSpace = await workSpaceUserRepo.find({
          where: { workSpaceId },
          relations: { workSpace: true },
        });
        return usersInWorkSpace.find((user) => user.userId === userId);
      } catch (error) {
        throw new DBError('Error checking if user exists in workspace', error);
      }
    },
    __recreateFunction: getWorkSpaceUserRepo,
  };
}
