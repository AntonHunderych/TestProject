import { IWorkSpaceGoogleCalendarEvent } from '../../../../repos/workspace/googleCalendarEvent/workSpaceGoogleCalendarEvent';

export async function deleteGoogleCalendarEvent(
  workSpaceGoogleCalendarEventRepo: IWorkSpaceGoogleCalendarEvent,
  todoId: string,
) {
  await workSpaceGoogleCalendarEventRepo.deleteEvents(todoId);
}
