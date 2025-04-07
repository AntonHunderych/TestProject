import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceUserCommandEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceUserCommandEntity';
import { DBError } from '../../../types/errors/DBError';
import { WorkSpaceCommandEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceCommandEntity';

export interface IWorkSpaceUserCommandRepo extends IRecreateRepo {
  addUser(userId: string, commandId: string): Promise<void>;

  removeUser(workSpaceId: string, userId: string, commandId: string): Promise<void>;

  getUserCommands(userId: string): Promise<WorkSpaceCommandEntity[]>;
}

export function getWorkSpaceUserCommandRepo(db: DataSource | EntityManager): IWorkSpaceUserCommandRepo {
  const workSpaceUserCommandRepo = db.getRepository(WorkSpaceUserCommandEntity);

  return {
    async addUser(userId: string, commandId: string): Promise<void> {
      try {
        await workSpaceUserCommandRepo.createQueryBuilder().insert().values({ userId, commandId }).execute();
      } catch (error) {
        throw new DBError('Error adding user to workspace command', error);
      }
    },
    async removeUser(workSpaceId: string, userId: string, commandId: string): Promise<void> {
      try {
        await workSpaceUserCommandRepo
          .createQueryBuilder()
          .delete()
          .where('workSpaceId=:workSpaceId', { workSpaceId })
          .andWhere('userId=:userId', { userId })
          .andWhere('commandId=:commandId', { commandId })
          .execute();
      } catch (error) {
        throw new DBError('Error removing user from workspace command', error);
      }
    },
    async getUserCommands(userId: string): Promise<WorkSpaceCommandEntity[]> {
      try {
        const result = await workSpaceUserCommandRepo
          .createQueryBuilder('userCommand')
          .innerJoinAndSelect('userCommand.command', 'command')
          .where('userCommand.userId = :userId', { userId })
          .getMany();
        return result.map((userCommand) => userCommand.command);
      } catch (error) {
        throw new DBError('Error fetching user commands', error);
      }
    },
    __recreateFunction: getWorkSpaceUserCommandRepo,
  };
}
