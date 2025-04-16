import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceGoogleCalendarEventEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarEventEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IWorkSpaceGoogleCalendarEvent extends IRecreateRepo {
  setEvents(data: { todoId: string; eventId: string; tokenId: string }[]): Promise<void>;
  deleteEvents(todoId: string): Promise<void>;
  eventExist(todoId: string): Promise<boolean>;
}

export function getWorkSpaceGoogleCalendarEventRepo(db: DataSource | EntityManager): IWorkSpaceGoogleCalendarEvent {
  const workSpaceGoogleCalendarEventRepo = db.getRepository(WorkSpaceGoogleCalendarEventEntity);

  return {
    async eventExist(todoId: string): Promise<boolean> {
      try {
        return !!(await workSpaceGoogleCalendarEventRepo.findOne({
          where: { todoId },
        }));
      } catch (e) {
        throw new DBError('Get events by todoId error', e);
      }
    },
    async setEvents(data: { todoId: string; eventId: string; tokenId: string }[]): Promise<void> {
      try {
        await workSpaceGoogleCalendarEventRepo
          .createQueryBuilder()
          .insert()
          .values(data)
          .orUpdate(['eventId'], ['todoId', 'tokenId'])
          .execute();
      } catch (e) {
        throw new DBError('Error setting event', e);
      }
    },
    async deleteEvents(todoId: string): Promise<void> {
      try {
        await workSpaceGoogleCalendarEventRepo
          .createQueryBuilder()
          .delete()
          .where('todoId = :todoId', { todoId })
          .execute();
      } catch (e) {
        throw new DBError('Error deleting event', e);
      }
    },
    __recreateFunction: getWorkSpaceGoogleCalendarEventRepo,
  };
}
