import { WorkSpaceTodoEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { ICalendar } from '../../../../services/calendar/ICalendar';
import { WorkSpaceGoogleCalendarTokenEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarTokenEntity';

export async function setCalendarEvent(
  calendar: ICalendar,
  token: WorkSpaceGoogleCalendarTokenEntity,
  calendarId: string,
  todo: WorkSpaceTodoEntity,
): Promise<string> {
  return await calendar.setEvent(
    token.token,
    calendarId,
    {
      summary: todo.title,
      description: todo.description!,
    },
    todo.eliminatedDate!,
  );
}
