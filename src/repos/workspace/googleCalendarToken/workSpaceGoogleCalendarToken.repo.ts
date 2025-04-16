import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceGoogleCalendarTokenEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarTokenEntity';
import { DBError } from '../../../types/errors/DBError';
import { ApplicationError } from '../../../types/errors/ApplicationError';

export interface IWorkSpaceGoogleCalendarToken {
  setToken(token: string, userId: string, workSpaceId: string, calendarId: string): Promise<void>;
  getTokensWithUserCommand(workSpaceId: string, todoId: string): Promise<WorkSpaceGoogleCalendarTokenEntity[]>;
  getUserTokenWithCommand(userId: string): Promise<WorkSpaceGoogleCalendarTokenEntity>;
  userHaveToken(userId: string): Promise<boolean>;
}

export function getWorkSpaceGoogleCalendarTokenRepo(db: DataSource | EntityManager): IWorkSpaceGoogleCalendarToken {
  const workSpaceGoogleCalendarTokenRepo = db.getRepository(WorkSpaceGoogleCalendarTokenEntity);

  return {
    async userHaveToken(userId: string): Promise<boolean> {
      try {
        return !!(await workSpaceGoogleCalendarTokenRepo.findOne({ where: { userId } }));
      } catch (e) {
        throw new DBError('User have token error', e);
      }
    },
    async getUserTokenWithCommand(userId: string): Promise<WorkSpaceGoogleCalendarTokenEntity> {
      try {
        return await workSpaceGoogleCalendarTokenRepo
          .createQueryBuilder('token')
          .leftJoinAndSelect('token.user', 'user')
          .leftJoinAndSelect('user.commands', 'userCommand')
          .leftJoinAndSelect('userCommand.command', 'command')
          .leftJoinAndSelect('token.events', 'event')
          .where('token.userId = :userId', { userId })
          .getOneOrFail();
      } catch (e) {
        throw new ApplicationError('Error get user googleCalendarToken with command', e);
      }
    },
    async setToken(token: string, userId: string, workSpaceId: string, calendarId: string): Promise<void> {
      try {
        await workSpaceGoogleCalendarTokenRepo
          .createQueryBuilder()
          .insert()
          .values({ userId, workSpaceId, token, calendarId })
          .orUpdate(['token', 'calendarId'], ['userId', 'workSpaceId'])
          .returning('*')
          .execute();
      } catch (e) {
        throw new DBError('Set googleCalendarToken error', e);
      }
    },
    async getTokensWithUserCommand(workSpaceId: string, todoId: string): Promise<WorkSpaceGoogleCalendarTokenEntity[]> {
      try {
        return await workSpaceGoogleCalendarTokenRepo
          .createQueryBuilder('token')
          .leftJoinAndSelect('token.user', 'user')
          .leftJoinAndSelect('user.commands', 'userCommand')
          .leftJoinAndSelect('userCommand.command', 'command')
          .leftJoinAndSelect('token.events', 'event', 'event.todoId = :todoId', { todoId }) // приєднуємо тільки події з потрібним todoId
          .where('token.workSpaceId = :workSpaceId', { workSpaceId })
          .getMany();
      } catch (e) {
        throw new DBError('Get googleCalendarTokens with user command error', e);
      }
    },
  };
}
