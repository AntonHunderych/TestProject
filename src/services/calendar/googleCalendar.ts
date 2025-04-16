import { ICalendar, TEventData } from './ICalendar';
import { calendar_v3, google } from 'googleapis';
import { FastifyInstance } from 'fastify';
import { ApplicationError } from '../../types/errors/ApplicationError';
import Calendar = calendar_v3.Calendar;

export function getGoogleCalendar(f: FastifyInstance): ICalendar {
  const getUserCalendar = function (token: string): Calendar {
    const oauth2Client = f.getOAuth2Client();

    oauth2Client.setCredentials({
      refresh_token: token,
    });

    return google.calendar({ version: 'v3', auth: oauth2Client });
  };

  return {
    async createCalendar(token: string, calendarId: string): Promise<void> {
      try {
        const calendar = getUserCalendar(token);
        await calendar.calendars.insert({
          requestBody: {
            id: calendarId,
          },
        });
      } catch (e) {
        throw new ApplicationError('Error creating calendar', e);
      }
    },
    async deleteCalendar(token: string, calendarId: string): Promise<void> {
      try {
        const calendar = getUserCalendar(token);
        await calendar.calendars.delete({
          calendarId,
        });
      } catch (e) {
        throw new ApplicationError('Error creating calendar', e);
      }
    },
    async deleteAllEvent(token: string, calendarId: string): Promise<void> {
      try {
        const calendar = getUserCalendar(token);
        const events = await calendar.events.list({
          calendarId,
        });
        const eventsToDelete = events.data.items || [];
        await Promise.all(
          eventsToDelete.map(async (event) => {
            await calendar.events.delete({
              calendarId,
              eventId: event.id!,
            });
          }),
        );
      } catch (e) {
        throw new ApplicationError('Error deleting calendar event', e);
      }
    },
    async updateEvent(
      token: string,
      calendarId: string,
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
          calendarId,
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
    async deleteEvent(token: string, calendarId: string, eventId: string): Promise<void> {
      try {
        const calendar = getUserCalendar(token);
        await calendar.events.delete({
          calendarId,
          eventId,
        });
      } catch (e) {
        throw new ApplicationError('Error deleting event', e);
      }
    },
    async setEvent(
      token: string,
      calendarId: string,
      eventData: TEventData,
      finishTime: Date,
      startTime: Date = new Date(),
    ): Promise<string> {
      try {
        if (finishTime <= startTime) {
          throw new ApplicationError('finishTime must be later then startTime');
        }

        const calendar = getUserCalendar(token);

        const event = await calendar.events.insert({
          calendarId,
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
      } catch (e) {
        throw new ApplicationError('Error creating event', e);
      }
    },
  };
}
