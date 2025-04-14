import { IWithTransaction } from '../../../../services/withTransaction/IWithTransaction';
import { ICalendar } from '../../../../services/calendar/ICalendar';
import { IWorkSpaceGoogleCalendarToken } from '../../../../repos/workspace/googleCalendarToken/workSpaceGoogleCalendarToken.repo';
import { IWorkSpaceGoogleCalendarEvent } from '../../../../repos/workspace/googleCalendarEvent/workSpaceGoogleCalendarEvent';
import { WorkSpaceGoogleCalendarEventEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarEventEntity';
import { WorkSpaceGoogleCalendarTokenEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarTokenEntity';

export async function deleteTodoSynchronizeGoogleCalendar(
  withTransaction: IWithTransaction,
  calendar: ICalendar,
  workSpaceGoogleCalendarTokenRepo: IWorkSpaceGoogleCalendarToken,
  workSpaceGoogleCalendarEventRepo: IWorkSpaceGoogleCalendarEvent,
  workSpaceId: string,
  todoId: string,
) {
  const events: WorkSpaceGoogleCalendarEventEntity[] = await workSpaceGoogleCalendarEventRepo.getEventsByTodoId(todoId);
  const tokens: WorkSpaceGoogleCalendarTokenEntity[] = await workSpaceGoogleCalendarTokenRepo.getUserTokens(
    events.map((event) => event.userId),
  );

  await withTransaction(
    {
      workSpaceGoogleCalendarEventRepo,
    },
    async (repos) => {
      for (const event of events) {
        const token = tokens.find((token) => token.userId === event.userId);
        if (!token) {
          continue;
        }
        await calendar.deleteEvent(token.token, workSpaceId, event.eventId);
        await repos.workSpaceGoogleCalendarEventRepo.deleteEvent(todoId, token.userId, workSpaceId);
      }
    },
  );
}
