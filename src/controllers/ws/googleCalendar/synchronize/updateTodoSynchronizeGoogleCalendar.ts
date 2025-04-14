import { IWithTransaction } from '../../../../services/withTransaction/IWithTransaction';
import { ICalendar } from '../../../../services/calendar/ICalendar';
import { IWorkSpaceGoogleCalendarToken } from '../../../../repos/workspace/googleCalendarToken/workSpaceGoogleCalendarToken.repo';
import { IWorkSpaceGoogleCalendarEvent } from '../../../../repos/workspace/googleCalendarEvent/workSpaceGoogleCalendarEvent';
import { WorkSpaceTodoEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { WorkSpaceGoogleCalendarEventEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarEventEntity';
import { WorkSpaceGoogleCalendarTokenEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarTokenEntity';

export async function updateTodoSynchronizeGoogleCalendar(
  withTransaction: IWithTransaction,
  calendar: ICalendar,
  workSpaceGoogleCalendarTokenRepo: IWorkSpaceGoogleCalendarToken,
  workSpaceGoogleCalendarEventRepo: IWorkSpaceGoogleCalendarEvent,
  workSpaceId: string,
  todo: WorkSpaceTodoEntity,
  newTodoData: Partial<WorkSpaceTodoEntity>,
) {
  if (
    newTodoData.eliminatedDate === undefined &&
    newTodoData.title === undefined &&
    newTodoData.description === undefined
  ) {
    return;
  }
  const events: WorkSpaceGoogleCalendarEventEntity[] = await workSpaceGoogleCalendarEventRepo.getEventsByTodoId(
    todo.id,
  );
  const tokens: WorkSpaceGoogleCalendarTokenEntity[] = await workSpaceGoogleCalendarTokenRepo.getUserTokens(
    events.map((event) => event.userId),
  );
  await withTransaction(
    {
      workSpaceGoogleCalendarEventRepo,
    },
    async (repos) => {
      for (const event of events) {
        const token = tokens.find((token) => token.userId === event.userId);
        if (!token) {
          continue;
        }
        await calendar.updateEvent(
          token.token,
          workSpaceId,
          event.eventId,
          {
            summary: newTodoData?.title,
            description: newTodoData?.description as string | undefined,
          },
          {
            startTime: todo.createdAt,
            finishTime: newTodoData.eliminatedDate ? newTodoData.eliminatedDate : todo.eliminatedDate!,
          },
        );
        await repos.workSpaceGoogleCalendarEventRepo.setEvent(todo.id, token.userId, workSpaceId, event.eventId);
      }
    },
  );
}
