import { IWorkSpaceGoogleCalendarToken } from '../../../repos/workspace/googleCalendarToken/workSpaceGoogleCalendarToken.repo';
import { ICalendar } from '../../../services/calendar/ICalendar';
import { convertUUIDToGoogleId } from './synchronize/convertUUIDToGoogleId';
import { getOAuth2Client } from '../../../services/OAuth2Client/getOAuth2Client';
import { ApplicationError } from '../../../types/errors/ApplicationError';

export async function clearWorkSpaceUserCalendarData(
  workSpaceGoogleCalendarTokenRepo: IWorkSpaceGoogleCalendarToken,
  calendar: ICalendar,
  _getOAuth2Client: typeof getOAuth2Client,
  workSpaceUserId: string,
) {
  const token = await workSpaceGoogleCalendarTokenRepo.getUserTokenWithCommand(workSpaceUserId);
  await calendar.deleteCalendar(token.token, convertUUIDToGoogleId(token.workSpaceId));
  try {
    const client = _getOAuth2Client();
    await client.revokeToken(token.token);
  } catch (e) {
    throw new ApplicationError('Error revoking token', e);
  }
}
