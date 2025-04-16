import { IWorkSpaceGoogleCalendarToken } from '../../../repos/workspace/googleCalendarToken/workSpaceGoogleCalendarToken.repo';

export async function setGoogleCalendarToken(
  workSpaceGoogleCalendarTokensRepo: IWorkSpaceGoogleCalendarToken,
  workSpaceUserId: string,
  token: string,
  workSpaceId: string,
  calendarId: string,
) {
  await workSpaceGoogleCalendarTokensRepo.setToken(token, workSpaceUserId, workSpaceId, calendarId);
}
