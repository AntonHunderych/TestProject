import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceCommandEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceCommandEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { IWorkSpaceCommand, WorkSpaceCommandSchema } from '../../../types/entities/WorkSpace/WorkSpaceCommandSchema';

export interface IWorkSpaceCommandRepo extends IRecreateRepo {
  createCommand(workSpaceId: string, commandId: string): Promise<IWorkSpaceCommand>;

  deleteCommand(commandId: string): Promise<void>;

  updateCommand(commandId: string, value: string): Promise<IWorkSpaceCommand>;
}

export function getWorkSpaceCommandRepo(db: DataSource | EntityManager): IWorkSpaceCommandRepo {
  const workSpaceCommandRepo = db.getRepository<WorkSpaceCommandEntity>(WorkSpaceCommandEntity);

  return {
    async createCommand(workSpaceId: string, value: string): Promise<IWorkSpaceCommand> {
      try {
        const result = await workSpaceCommandRepo
          .createQueryBuilder()
          .insert()
          .values({ workSpaceId, value })
          .returning('*')
          .execute();
        return WorkSpaceCommandSchema.parse(result.generatedMaps[0]);
      } catch (error) {
        throw new DBError('Error creating workspace command', error);
      }
    },
    async deleteCommand(commandId: string): Promise<void> {
      try {
        await workSpaceCommandRepo.createQueryBuilder().delete().where({ id: commandId }).execute();
      } catch (error) {
        throw new DBError('Error deleting workspace command', error);
      }
    },
    async updateCommand(commandId: string, value: string): Promise<IWorkSpaceCommand> {
      try {
        const result = await workSpaceCommandRepo
          .createQueryBuilder()
          .update()
          .set({ value })
          .where('id=:commandId', { commandId })
          .returning('*')
          .execute();
        return WorkSpaceCommandSchema.parse(result.raw[0]);
      } catch (error) {
        throw new DBError('Error update workspace command', error);
      }
    },
    __recreateFunction: getWorkSpaceCommandRepo,
  };
}
