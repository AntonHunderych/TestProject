import { IWorkSpaceRepo } from '../../repos/workspace/workspace.repo';
import { getWorkSpaceById } from './getWorkSpaceById';
import { clearWorkSpaceUserCalendarData } from './googleCalendar/clearWorkSpaceUserCalendarData';
import { IWorkSpaceGoogleCalendarToken } from '../../repos/workspace/googleCalendarToken/workSpaceGoogleCalendarToken.repo';
import { ICalendar } from '../../services/calendar/ICalendar';
import { getOAuth2Client } from '../../services/OAuth2Client/getOAuth2Client';
import { WorkSpaceEntity } from '../../services/typeorm/entities/WorkSpace/WorkSpaceEntity';
import { cancelTodoNotifications } from './notification/cancelTodoNotifications';
import { IWorkSpaceTodoRepo } from '../../repos/workspace/todos/workSpaceTodos.repo';
import { INotificationService } from '../../services/notification/INotificationService';
import { ApplicationError } from '../../types/errors/ApplicationError';

export async function clearWorkSpaceData(
  workSpaceRepo: IWorkSpaceRepo,
  workSpaceId: string,
  workSpaceGoogleCalendarTokenRepo: IWorkSpaceGoogleCalendarToken,
  calendar: ICalendar,
  _getOAuth2Client: typeof getOAuth2Client,
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  notification: INotificationService,
) {
  try {
    const workSpace: WorkSpaceEntity = await getWorkSpaceById(workSpaceRepo, workSpaceId);
    await Promise.all(
      workSpace.users?.map((user) =>
        clearWorkSpaceUserCalendarData(workSpaceGoogleCalendarTokenRepo, calendar, _getOAuth2Client, user.id),
      ) ?? [],
    );
    const todosWithNotification = workSpace.todos?.filter(
      (todo) => todo.notification && !!todo.eliminatedDate && !todo.completed,
    );
    await Promise.all(
      todosWithNotification?.map((todo) => cancelTodoNotifications(workSpaceTodoRepo, notification, todo.id)) ?? [],
    );
  } catch (e) {
    throw new ApplicationError('Error clearing workspace data', e);
  }
}
