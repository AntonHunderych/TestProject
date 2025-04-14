import { WorkSpaceTodoEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { ICalendar } from '../../../../services/calendar/ICalendar';
import { IWorkSpaceGoogleCalendarEvent } from '../../../../repos/workspace/googleCalendarEvent/workSpaceGoogleCalendarEvent';
import { WorkSpaceGoogleCalendarTokenEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarTokenEntity';

export async function setCalendarEvent(
  calendar: ICalendar,
  token: WorkSpaceGoogleCalendarTokenEntity,
  workSpaceId: string,
  todo: WorkSpaceTodoEntity,
  workSpaceGoogleCalendarEventRepo: IWorkSpaceGoogleCalendarEvent,
): Promise<void> {
  const eventId = await calendar.setEvent(
    token.token,
    workSpaceId,
    {
      summary: todo.title,
      description: todo.description!,
    },
    todo.eliminatedDate!,
  );
  await workSpaceGoogleCalendarEventRepo.setEvent(todo.id, token.userId, workSpaceId, eventId);
}
