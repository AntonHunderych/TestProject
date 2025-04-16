import { IWorkSpaceGoogleCalendarEvent } from '../../../../repos/workspace/googleCalendarEvent/workSpaceGoogleCalendarEvent';

export async function setGoogleCalendarEvents(
  workSpaceGoogleCalendarEventRepo: IWorkSpaceGoogleCalendarEvent,
  data: {
    todoId: string;
    eventId: string;
    tokenId: string;
  }[],
) {
  await workSpaceGoogleCalendarEventRepo.setEvents(data);
}
