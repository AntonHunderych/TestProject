import { ICalendar } from '../../../../services/calendar/ICalendar';
import { IWorkSpaceGoogleCalendarToken } from '../../../../repos/workspace/googleCalendarToken/workSpaceGoogleCalendarToken.repo';
import { IWorkSpaceTodoRepo } from '../../../../repos/workspace/todos/workSpaceTodos.repo';
import { setCalendarEvent } from './setCalendarEvent';
import { ApplicationError } from '../../../../types/errors/ApplicationError';
import { setGoogleCalendarEvents } from '../events/setGoogleCalendarEvents';
import { IWorkSpaceGoogleCalendarEvent } from '../../../../repos/workspace/googleCalendarEvent/workSpaceGoogleCalendarEvent';

export async function synchronizeCalendar(
  calendar: ICalendar,
  workSpaceGoogleCalendarTokenRepo: IWorkSpaceGoogleCalendarToken,
  workSpaceGoogleCalendarEventRepo: IWorkSpaceGoogleCalendarEvent,
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  workSpaceUserId: string,
  workSpaceId: string,
) {
  const token = await workSpaceGoogleCalendarTokenRepo.getUserTokenWithCommand(workSpaceUserId);
  const todos = await workSpaceTodoRepo.findAllTodoInWorkSpaceByCommand(
    workSpaceId,
    token.user.commands.map((command) => command.command.value),
  );

  await calendar.deleteAllEvent(token.token, token.calendarId);

  try {
    const data = await Promise.all(
      todos.map(async (todo) => {
        if (!todo.eliminatedDate) {
          return Promise.reject();
        }
        return {
          todoId: todo.id,
          eventId: await setCalendarEvent(calendar, token, token.calendarId, todo),
          tokenId: token.id,
        };
      }),
    );

    await setGoogleCalendarEvents(workSpaceGoogleCalendarEventRepo, data);
  } catch (e) {
    throw new ApplicationError('Error synchronizing calendar', e);
  }
}
