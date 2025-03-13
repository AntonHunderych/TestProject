import { DataSource } from 'typeorm';
import { WorkSpaceUser } from '../../../db/entities/WorkSpaceUser';
import { IWorkspace } from '../../../db/schemas/WorkSpaceSchema';

export interface IWorkSpaceUserRepo {
  addUserToWorkSpace(workSpaceId: string, userId: string): Promise<WorkSpaceUser>;
  getUserAllWorkSpaces(id: string): Promise<IWorkspace[]>;
  getAllCreatedWorkSpaces(id: string): Promise<IWorkspace[]>;
  existUserInWorkSpace(workSpaceId: string, userId: string): Promise<WorkSpaceUser|undefined>;
}

export function getWorkSpaceUserRepo(db: DataSource): IWorkSpaceUserRepo {
  const workSpaceUserRepo = db.getRepository(WorkSpaceUser);

  return {
    async addUserToWorkSpace(workSpaceId: string, userId: string): Promise<WorkSpaceUser> {
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

      return workSpaceUserRepo.save(newWorkSpaceUser);
    },
    async getUserAllWorkSpaces(id: string): Promise<IWorkspace[]> {
      const user = await workSpaceUserRepo.find({ where: { userId: id }, relations: { workSpace: true } });
      return user.map((wsUser) => wsUser.workSpace);
    },
    async getAllCreatedWorkSpaces(id: string): Promise<IWorkspace[]> {
      const user = await workSpaceUserRepo.find({ where: { userId: id }, relations: { workSpace: true } });
      return user.map((wsUser) => wsUser.workSpace).filter((workSpace) => workSpace?.creatorId === id);
    },
    async existUserInWorkSpace(workSpaceId: string, userId: string): Promise<WorkSpaceUser|undefined>{
      const usersInWorkSpace = await workSpaceUserRepo.find({where:{workSpaceId},relations: { workSpace: true }});
      return  usersInWorkSpace.find((user)=>user.userId === userId)
    }
  };
}
