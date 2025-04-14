import { IWorkSpaceGoogleCalendarEvent } from '../../../../repos/workspace/googleCalendarEvent/workSpaceGoogleCalendarEvent';
import { IWorkSpaceGoogleCalendarToken } from '../../../../repos/workspace/googleCalendarToken/workSpaceGoogleCalendarToken.repo';
import { WorkSpaceTodoEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { IWithTransaction } from '../../../../services/withTransaction/IWithTransaction';
import { ICalendar } from '../../../../services/calendar/ICalendar';
import { setCalendarEvent } from './setCalendarEvent';

export async function insertTodoSynchronizeGoogleCalendar(
  withTransaction: IWithTransaction,
  calendar: ICalendar,
  workSpaceGoogleCalendarTokenRepo: IWorkSpaceGoogleCalendarToken,
  workSpaceGoogleCalendarEventRepo: IWorkSpaceGoogleCalendarEvent,
  workSpaceId: string,
  todo: WorkSpaceTodoEntity,
) {
  if (todo.eliminatedDate === null || todo.eliminatedDate === undefined) {
    return;
  }
  const tokensWithUserData = await workSpaceGoogleCalendarTokenRepo.getTokensWithUserCommand(workSpaceId);

  await withTransaction(
    {
      workSpaceGoogleCalendarEventRepo,
    },
    async (repos) => {
      if (todo.command) {
        for (const token of tokensWithUserData) {
          if (token.user.commands.map((userCommand) => userCommand.command).includes(todo.command)) {
            await setCalendarEvent(calendar, token, workSpaceId, todo, repos.workSpaceGoogleCalendarEventRepo);
          }
        }
      } else {
      }
      for (const token of tokensWithUserData) {
        await setCalendarEvent(calendar, token, workSpaceId, todo, repos.workSpaceGoogleCalendarEventRepo);
      }
    },
  );
}
