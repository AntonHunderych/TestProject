import { IWorkSpaceGoogleCalendarEvent } from '../../../../repos/workspace/googleCalendarEvent/workSpaceGoogleCalendarEvent';
import { IWorkSpaceGoogleCalendarToken } from '../../../../repos/workspace/googleCalendarToken/workSpaceGoogleCalendarToken.repo';
import { WorkSpaceTodoEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { ICalendar } from '../../../../services/calendar/ICalendar';
import { setCalendarEvent } from './setCalendarEvent';
import { getTokensFilteredByUserCommand } from './getTokensFilteredByUserCommand';
import { ApplicationError } from '../../../../types/errors/ApplicationError';
import { setGoogleCalendarEvents } from '../events/setGoogleCalendarEvents';

export async function insertTodoSynchronizeGoogleCalendar(
  calendar: ICalendar,
  workSpaceGoogleCalendarTokenRepo: IWorkSpaceGoogleCalendarToken,
  workSpaceGoogleCalendarEventRepo: IWorkSpaceGoogleCalendarEvent,
  workSpaceId: string,
  todo: WorkSpaceTodoEntity,
) {
  if (!todo.eliminatedDate) {
    return;
  }
  if (await workSpaceGoogleCalendarEventRepo.eventExist(todo.id)) {
    return;
  }

  const tokensToProcess = await getTokensFilteredByUserCommand(
    todo.command,
    todo.id,
    workSpaceId,
    workSpaceGoogleCalendarTokenRepo,
  );

  try {
    const data = await Promise.all(
      tokensToProcess.map(async (token) => {
        return {
          todoId: todo.id,
          eventId: await setCalendarEvent(calendar, token, token.calendarId, todo),
          tokenId: token.id,
        };
      }),
    );

    await setGoogleCalendarEvents(workSpaceGoogleCalendarEventRepo, data);
  } catch (e) {
    throw new ApplicationError('Error inserting todo into Google Calendar', e);
  }
}
