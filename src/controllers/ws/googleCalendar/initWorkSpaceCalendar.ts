import { google } from 'googleapis';
import { IWorkSpaceRepo } from '../../../repos/workspace/workspace.repo';
import { getOAuth2Client } from '../../../services/OAuth2Client/getOAuth2Client';
import { Credentials } from 'google-auth-library';
import { ApplicationError } from '../../../types/errors/ApplicationError';

export async function initWorkSpaceCalendar(
  workSpaceRepo: IWorkSpaceRepo,
  workSpaceId: string,
  tokens: Credentials,
  _getOAuth2Client: typeof getOAuth2Client,
): Promise<string> {
  try {
    const workSpace = await workSpaceRepo.getWorkSpaceById(workSpaceId);

    const client = _getOAuth2Client();
    client.setCredentials(tokens);

    const calendar = google.calendar({ version: 'v3', auth: client });
    const newCalendar = await calendar.calendars.insert({
      requestBody: {
        summary: 'Test project WorkSpace - ' + workSpace.name,
        description: workSpace.description,
      },
    });
    return newCalendar.data.id!;
  } catch (e) {
    throw new ApplicationError('Error initializing workspace calendar', e);
  }
}
