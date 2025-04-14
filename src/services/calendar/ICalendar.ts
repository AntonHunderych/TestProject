export type TEventData = {
  summary?: string;
  description?: string;
};

export interface ICalendar {
  setEvent(
    token: string,
    calendarId: string,
    eventData: TEventData,
    finishTime: Date,
    startTime?: Date,
  ): Promise<string>;
  deleteEvent(token: string, calendarId: string, eventId: string): Promise<void>;
  updateEvent(
    token: string,
    calendarId: string,
    eventId: string,
    eventData: TEventData,
    newData: {
      finishTime: Date;
      startTime: Date;
    },
  ): Promise<void>;
}
