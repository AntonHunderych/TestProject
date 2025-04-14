import { IWorkSpaceGoogleCalendarEvent } from '../../../../repos/workspace/googleCalendarEvent/workSpaceGoogleCalendarEvent';

export async function deleteGoogleCalendarEvent(
  workSpaceGoogleCalendarEventRepo: IWorkSpaceGoogleCalendarEvent,
  todoId: string,
  userId: string,
  workSpaceId: string,
) {
  await workSpaceGoogleCalendarEventRepo.deleteEvent(todoId, userId, workSpaceId);
}
