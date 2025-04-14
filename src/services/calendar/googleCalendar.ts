import { ICalendar, TEventData } from './ICalendar';
import { calendar_v3, google } from 'googleapis';
import Calendar = calendar_v3.Calendar;
import { FastifyInstance } from 'fastify';
import { ApplicationError } from '../../types/errors/ApplicationError';

export function getGoogleCalendar(f: FastifyInstance): ICalendar {
  const getUserCalendar = function (token: string): Calendar {
    const oauth2Client = f.getOAuth2Client();

    oauth2Client.setCredentials({
      refresh_token: token,
    });

    return google.calendar({ version: 'v3', auth: oauth2Client });
  };

  return {
    async updateEvent(
      token: string,
      _calendarId: string,
      eventId: string,
      eventData: TEventData,
      newData: {
        finishTime: Date;
        startTime: Date;
      },
    ): Promise<void> {
      try {
        const calendar = getUserCalendar(token);

        await calendar.events.update({
          calendarId: 'primary',
          eventId,
          requestBody: {
            summary: eventData.summary,
            description: eventData.description,
            start: {
              dateTime: newData.startTime.toISOString(),
            },
            end: {
              dateTime: newData.finishTime.toISOString(),
            },
          },
        });
      } catch (e) {
        throw new ApplicationError('Error updating event', e);
      }
    },
    async deleteEvent(token: string, _calendarId: string, eventId: string): Promise<void> {
      try {
        const calendar = getUserCalendar(token);
        await calendar.events.delete({
          calendarId: 'primary',
          eventId,
        });
      } catch (e) {
        throw new ApplicationError('Error deleting event', e);
      }
    },
    async setEvent(
      token: string,
      _calendarId: string,
      eventData: TEventData,
      finishTime: Date,
      startTime: Date = new Date(),
    ): Promise<string> {
      if (finishTime <= startTime) {
        throw new ApplicationError('finishTime must be later then startTime');
      }

      const calendar = getUserCalendar(token);
      const event = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: eventData.summary,
          description: eventData.description,
          start: {
            dateTime: startTime.toISOString(),
          },
          end: {
            dateTime: finishTime.toISOString(),
          },
        },
      });
      return event.data.id!;
    },
  };
}
