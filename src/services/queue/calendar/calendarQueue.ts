import { Queue } from 'bullmq';
import { TCalendarQueueData } from '../../../types/TCalendarQueue';
import { ECalendarQueueEvents } from '../../../types/enum/ECalendarQueue';

export const calendarQueue = new Queue('calendarTask', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

export async function AddCalendarJob<K extends ECalendarQueueEvents>(eventType: K, data: TCalendarQueueData[K]) {
  await calendarQueue.add(
    'calendarTask',
    { type: eventType, data },
    {
      attempts: 1,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  );
}
