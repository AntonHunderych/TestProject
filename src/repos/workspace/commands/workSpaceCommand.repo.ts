import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceCommandEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceCommandEntity';
import { WorkSpaceUserEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceUserEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IWorkSpaceCommandsRepo extends IRecreateRepo {
  create(workSpaceId: string, value: string): Promise<WorkSpaceCommandEntity>;

  getAll(workSpaceId: string): Promise<WorkSpaceCommandEntity[]>;

  delete(workSpaceId: string, value: string): Promise<void>;

  addUser(workSpaceId: string, value: string, userId: string): Promise<void>;

  removeUser(workSpaceId: string, value: string, userId: string): Promise<void>;

  getUserCommands(userId: string, workSpaceId: string): Promise<WorkSpaceCommandEntity[]>;
}

export function getWorkSpaceCommandRepo(db: DataSource | EntityManager): IWorkSpaceCommandsRepo {
  const workSpaceCommandRepo = db.getRepository<WorkSpaceCommandEntity>(WorkSpaceCommandEntity);

  return {
    async create(workSpaceId: string, value: string): Promise<WorkSpaceCommandEntity> {
      try {
        return await workSpaceCommandRepo.save({ workSpaceId, value });
      } catch (error) {
        throw new DBError('Error creating workspace command', error);
      }
    },
    async getAll(workSpaceId: string): Promise<WorkSpaceCommandEntity[]> {
      try {
        return await workSpaceCommandRepo.find({ where: { workSpaceId } });
      } catch (error) {
        throw new DBError('Error fetching all workspace commands', error);
      }
    },
    async delete(workSpaceId: string, value: string): Promise<void> {
      try {
        await workSpaceCommandRepo.delete({ workSpaceId, value });
      } catch (error) {
        throw new DBError('Error deleting workspace command', error);
      }
    },
    async addUser(workSpaceId: string, value: string, userId: string) {
      try {
        const command = await workSpaceCommandRepo.findOneOrFail({
          where: { workSpaceId, value },
          relations: { users: true },
        });
        const user = new WorkSpaceUserEntity();
        user.workSpaceId = workSpaceId;
        user.userId = userId;
        command.users.push(user);
        await workSpaceCommandRepo.save(command);
      } catch (error) {
        throw new DBError('Error adding user to workspace command', error);
      }
    },
    async removeUser(workSpaceId: string, value: string, userId: string) {
      try {
        const command = await workSpaceCommandRepo.findOneOrFail({
          where: { workSpaceId, value },
          relations: { users: true },
        });
        if (!command.users) {
          return;
        }
        command.users = command.users.filter((user) => user.userId !== userId);
        await workSpaceCommandRepo.save(command);
      } catch (error) {
        throw new DBError('Error removing user from workspace command', error);
      }
    },
    async getUserCommands(userId: string, workSpaceId: string): Promise<WorkSpaceCommandEntity[]> {
      try {
        return await workSpaceCommandRepo
          .createQueryBuilder('command')
          .innerJoinAndSelect('command.users', 'user')
          .where('user.userId = :userId', { userId })
          .andWhere('command.workSpaceId = :workSpaceId', { workSpaceId })
          .getMany();
      } catch (error) {
        throw new DBError('Error fetching user commands', error);
      }
    },
    __recreateFunction: getWorkSpaceCommandRepo,
  };
}
