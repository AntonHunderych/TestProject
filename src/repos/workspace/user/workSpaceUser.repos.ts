import { DataSource } from 'typeorm';
import { WorkSpaceUser } from '../../../db/entities/WorkSpaceUser';
import { IWorkspace } from '../../../db/schemas/WorkSpaceSchema';

export interface IWorkSpaceUserRepo {

  addUserToWorkSpace(workSpaceId: string, userId: string): Promise<WorkSpaceUser>;
  getUserAllWorkSpaces(id: string): Promise<IWorkspace[]>;
  getAllCreatedWorkSpaces(id: string): Promise<IWorkspace[]>;
}

export function getWorkSpaceUserRepo (db: DataSource): IWorkSpaceUserRepo {

  const workSpaceUserRepo = db.getRepository(WorkSpaceUser);

  return {
    async addUserToWorkSpace (workSpaceId: string, userId: string): Promise<WorkSpaceUser> {

      let existingUser = await workSpaceUserRepo.findOne({
        where: { workSpaceId, userId },
      });

      if (existingUser) {
        return existingUser;
      }

      const lastUser = await workSpaceUserRepo
        .createQueryBuilder('wsUser')
        .where('wsUser.workSpaceId = :workSpaceId', { workSpaceId })
        .orderBy('wsUser.workSpaceUserId', 'DESC')
        .getOne();

      const newWorkSpaceUserId = lastUser ? lastUser.workSpaceUserId + 1 : 1;

      const newWorkSpaceUser = workSpaceUserRepo.create({
        userId,
        workSpaceId,
        workSpaceUserId: newWorkSpaceUserId,
      });

      return workSpaceUserRepo.save(newWorkSpaceUser);
    },
    async getUserAllWorkSpaces(id: string): Promise<IWorkspace[]> {
      const user = await workSpaceUserRepo.find({where: {userId: id},relations:{workSpace: true}});
      return user.map((wsUser) => wsUser.workSpace);
    },
    async getAllCreatedWorkSpaces(id: string): Promise<IWorkspace[]> {
      const user = await workSpaceUserRepo.find({where: {userId:id},relations:{workSpace:true}})
      return user
        .map((wsUser) => wsUser.workSpace)
        .filter((workSpace) => workSpace?.creatorId === id);
    }
  };
}