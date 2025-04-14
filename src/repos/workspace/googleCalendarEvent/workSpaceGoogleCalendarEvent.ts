import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceGoogleCalendarEventEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarEventEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IWorkSpaceGoogleCalendarEvent extends IRecreateRepo {
  setEvent(todoId: string, userId: string, workSpaceId: string, eventId: string): Promise<void>;
  deleteEvent(todoId: string, userId: string, workSpaceId: string): Promise<void>;
  getEventsByTodoId(todoId: string): Promise<WorkSpaceGoogleCalendarEventEntity[]>;
}

export function getWorkSpaceGoogleCalendarEventRepo(db: DataSource | EntityManager): IWorkSpaceGoogleCalendarEvent {
  const workSpaceGoogleCalendarEventRepo = db.getRepository(WorkSpaceGoogleCalendarEventEntity);

  return {
    getEventsByTodoId(todoId: string): Promise<WorkSpaceGoogleCalendarEventEntity[]> {
      try {
        return workSpaceGoogleCalendarEventRepo.find({
          where: { todoId },
        });
      } catch (e) {
        throw new DBError('Get events by todoId error', e);
      }
    },
    async setEvent(todoId: string, userId: string, workSpaceId: string, eventId: string): Promise<void> {
      try {
        await workSpaceGoogleCalendarEventRepo
          .createQueryBuilder()
          .insert()
          .values({ todoId, userId, workSpaceId, eventId })
          .orUpdate(['eventId'], ['todoId', 'userId', 'workSpaceId'])
          .execute();
      } catch (e) {
        throw new DBError('Error setting event', e);
      }
    },
    async deleteEvent(todoId: string, userId: string, workSpaceId: string): Promise<void> {
      try {
        await workSpaceGoogleCalendarEventRepo
          .createQueryBuilder()
          .delete()
          .where('todoId = :todoId', { todoId })
          .andWhere('userId = :userId', { userId })
          .andWhere('workSpaceId = :workSpaceId', { workSpaceId })
          .execute();
      } catch (e) {
        throw new DBError('Error deleting event', e);
      }
    },
    __recreateFunction: getWorkSpaceGoogleCalendarEventRepo,
  };
}
