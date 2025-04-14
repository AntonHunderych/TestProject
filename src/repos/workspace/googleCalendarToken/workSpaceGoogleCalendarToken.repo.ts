import { DataSource, EntityManager, In } from 'typeorm';
import { WorkSpaceGoogleCalendarTokenEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarTokenEntity';
import { DBError } from '../../../types/errors/DBError';

export interface IWorkSpaceGoogleCalendarToken {
  setToken(token: string, userId: string, workSpaceId: string): Promise<void>;
  getTokensWithUserCommand(workSpaceId: string): Promise<WorkSpaceGoogleCalendarTokenEntity[]>;
  getUserTokens(userIds: string[]): Promise<WorkSpaceGoogleCalendarTokenEntity[]>;
}

export function getWorkSpaceGoogleCalendarTokenRepo(db: DataSource | EntityManager): IWorkSpaceGoogleCalendarToken {
  const workSpaceGoogleCalendarTokenRepo = db.getRepository(WorkSpaceGoogleCalendarTokenEntity);

  return {
    getUserTokens(userIds: string[]): Promise<WorkSpaceGoogleCalendarTokenEntity[]> {
      try {
        return workSpaceGoogleCalendarTokenRepo.find({
          where: { userId: In(userIds) },
        });
      } catch (e) {
        throw new DBError('Get user tokens error', e);
      }
    },
    async setToken(token: string, userId: string, workSpaceId: string): Promise<void> {
      try {
        await workSpaceGoogleCalendarTokenRepo
          .createQueryBuilder()
          .insert()
          .values({ userId, workSpaceId, token })
          .execute();
      } catch (e) {
        throw new DBError('Set token error', e);
      }
    },
    async getTokensWithUserCommand(workSpaceId: string): Promise<WorkSpaceGoogleCalendarTokenEntity[]> {
      try {
        return await workSpaceGoogleCalendarTokenRepo.find({
          where: { workSpaceId },
          relations: {
            user: { commands: { command: true } },
          },
        });
      } catch (e) {
        throw new DBError('Get tokens with user command error', e);
      }
    },
  };
}
