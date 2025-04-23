import { ICalendar } from '../../../../services/calendar/ICalendar';
import { IWorkSpaceGoogleCalendarToken } from '../../../../repos/workspace/googleCalendarToken/workSpaceGoogleCalendarToken.repo';
import { WorkSpaceTodoEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { getTokensFilteredByUserCommand } from './getTokensFilteredByUserCommand';
import { updateCalendarEvent } from './updateCalendarEvent';
import { ApplicationError } from '../../../../types/errors/ApplicationError';
import { IWorkSpaceGoogleCalendarEvent } from '../../../../repos/workspace/googleCalendarEvent/workSpaceGoogleCalendarEvent';

export async function updateTodoSynchronizeGoogleCalendar(
  calendar: ICalendar,
  workSpaceGoogleCalendarTokenRepo: IWorkSpaceGoogleCalendarToken,
  workSpaceGoogleCalendarEventRepo: IWorkSpaceGoogleCalendarEvent,
  workSpaceId: string,
  todo: WorkSpaceTodoEntity,
  newTodoData: Partial<WorkSpaceTodoEntity>,
) {
  if (!newTodoData.eliminatedDate && !newTodoData.title && !newTodoData.description) {
    return;
  }
  if (!(await workSpaceGoogleCalendarEventRepo.eventExist(todo.id))) {
    return;
  }

  const tokensToProcess = await getTokensFilteredByUserCommand(
    todo.commandId,
    todo.id,
    workSpaceId,
    workSpaceGoogleCalendarTokenRepo,
  );

  try {
    await Promise.all(
      tokensToProcess.map((token) =>
        updateCalendarEvent(calendar, token, token.calendarId, todo, newTodoData, token.events[0].eventId),
      ),
    );
  } catch (e) {
    throw new ApplicationError('Error updating todo in Google Calendar', e);
  }
}
