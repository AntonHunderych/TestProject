import { ICalendar } from '../../../../services/calendar/ICalendar';
import { WorkSpaceGoogleCalendarTokenEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarTokenEntity';
import { WorkSpaceTodoEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';

export async function updateCalendarEvent(
  calendar: ICalendar,
  token: WorkSpaceGoogleCalendarTokenEntity,
  calendarId: string,
  todo: WorkSpaceTodoEntity,
  newTodoData: Partial<WorkSpaceTodoEntity>,
  eventId: string,
): Promise<void> {
  await calendar.updateEvent(
    token.token,
    calendarId,
    eventId,
    {
      summary: newTodoData?.title,
      description: newTodoData?.description as string | undefined,
    },
    {
      startTime: todo.createdAt,
      finishTime: newTodoData.eliminatedDate ? newTodoData.eliminatedDate : todo.eliminatedDate!,
    },
  );
}
