import cron from 'node-cron';
import { IScheduler, SchedulerTask } from './IScheduler';
import { ApplicationError } from '../../types/errors/ApplicationError';

export function getScheduler(): IScheduler {
  return {
    schedule(time: Date, callBack: () => void): Promise<SchedulerTask> {
      const now = new Date();

      if (time <= now) {
        throw new ApplicationError('Time cannot be in the past');
      }

      try {
        const seconds = time.getSeconds();
        const minutes = time.getMinutes();
        const hours = time.getHours();
        const day = time.getDate();
        const month = time.getMonth() + 1;

        const cronTime = `${seconds} ${minutes} ${hours} ${day} ${month} *`;
        const task = cron.schedule(cronTime, () => {
          try {
            callBack();
          } finally {
            task.stop();
          }
        });
        return Promise.resolve(task);
      } catch (e) {
        throw new ApplicationError('error in scheduler', e);
      }
    },
  };
}
