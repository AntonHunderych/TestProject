import { IWorkSpaceRepo } from '../../repos/workspace/workspace.repo';
import { IWithTransaction } from '../../services/withTransaction/IWithTransaction';
import { deleteWorkSpace } from './deleteWorkSpace';
import { clearWorkSpaceData } from './clearWorkSpaceData';
import { IWorkSpaceGoogleCalendarToken } from '../../repos/workspace/googleCalendarToken/workSpaceGoogleCalendarToken.repo';
import { ICalendar } from '../../services/calendar/ICalendar';
import { getOAuth2Client } from '../../services/OAuth2Client/getOAuth2Client';
import { IWorkSpaceTodoRepo } from '../../repos/workspace/todos/workSpaceTodos.repo';
import { INotificationService } from '../../services/notification/INotificationService';
import { decreaseCountOfCreatedWorkSpace } from '../limits/workSpaceLimits/decreaseCountOfCreatedWorkSpace';
import { IUserLimits } from '../../repos/limits/userLimits.repo';

export async function deleteWorkSpaceProcess(
  withTransaction: IWithTransaction,
  workSpaceRepo: IWorkSpaceRepo,
  workSpaceId: string,
  workSpaceGoogleCalendarTokenRepo: IWorkSpaceGoogleCalendarToken,
  calendar: ICalendar,
  _getOAuth2Client: typeof getOAuth2Client,
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  notification: INotificationService,
  userLimitRepo: IUserLimits,
  userId: string,
) {
  return await withTransaction(
    {
      workSpaceRepo,
      workSpaceGoogleCalendarTokenRepo,
      workSpaceTodoRepo,
      userLimitRepo,
    },
    async (repos) => {
      await clearWorkSpaceData(
        repos.workSpaceRepo,
        workSpaceId,
        repos.workSpaceGoogleCalendarTokenRepo,
        calendar,
        _getOAuth2Client,
        repos.workSpaceTodoRepo,
        notification,
      );
      await decreaseCountOfCreatedWorkSpace(repos.userLimitRepo, userId);
      return await deleteWorkSpace(repos.workSpaceRepo, workSpaceId);
    },
  );
}
