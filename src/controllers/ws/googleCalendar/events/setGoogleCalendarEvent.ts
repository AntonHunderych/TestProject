import { IWorkSpaceGoogleCalendarEvent } from '../../../../repos/workspace/googleCalendarEvent/workSpaceGoogleCalendarEvent';

export async function setGoogleCalendarEvent(
  workSpaceGoogleCalendarEventRepo: IWorkSpaceGoogleCalendarEvent,
  todoId: string,
  userId: string,
  workSpaceId: string,
  eventId: string,
) {
  await workSpaceGoogleCalendarEventRepo.setEvent(todoId, userId, workSpaceId, eventId);
}
