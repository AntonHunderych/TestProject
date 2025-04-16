import { ICalendar } from '../../../../services/calendar/ICalendar';
import { IWorkSpaceGoogleCalendarEvent } from '../../../../repos/workspace/googleCalendarEvent/workSpaceGoogleCalendarEvent';
import { WorkSpaceTodoEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { ApplicationError } from '../../../../types/errors/ApplicationError';
import { deleteGoogleCalendarEvent } from '../events/deleteGoogleCalendarEvent';
import { WorkSpaceGoogleCalendarTokenEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarTokenEntity';

export async function deleteTodoSynchronizeGoogleCalendar(
  calendar: ICalendar,
  workSpaceGoogleCalendarEventRepo: IWorkSpaceGoogleCalendarEvent,
  todo: WorkSpaceTodoEntity,
  tokensToProcess: WorkSpaceGoogleCalendarTokenEntity[],
) {
  try {
    await Promise.all(
      tokensToProcess.map((token) => calendar.deleteEvent(token.token, token.calendarId, token.events[0].eventId)),
    );
    await deleteGoogleCalendarEvent(workSpaceGoogleCalendarEventRepo, todo.id);
  } catch (e) {
    throw new ApplicationError('Error deleting event', e);
  }
}
