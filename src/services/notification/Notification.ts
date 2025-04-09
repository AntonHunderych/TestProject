import { INotificationService } from './INotificationService';
import { IScheduler, SchedulerTask } from '../scheduler/IScheduler';
import { ApplicationError } from '../../types/errors/ApplicationError';

export function getNotification(scheduler: IScheduler): INotificationService {
  const schedulerTasks = new Map<string, SchedulerTask>();

  const createNotification = async function (
    identifier: string,
    callback: () => Promise<void>,
    time: Date,
  ): Promise<void> {
    try {
      const schedulerTask = await scheduler.schedule(time, async () => {
        try {
          await callback();
        } finally {
          schedulerTasks.delete(identifier);
        }
      });

      schedulerTasks.set(identifier, schedulerTask);
    } catch (e) {
      throw new ApplicationError('error in creating Reminder', e);
    }
  };

  const ifExistStop = function (taskId: string): void {
    try {
      if (schedulerTasks.has(taskId)) {
        schedulerTasks.get(taskId)!.stop();
        schedulerTasks.delete(taskId);
      }
    } catch (e) {
      throw new ApplicationError('error in stopping Reminder', e);
    }
  };

  return {
    async cancelNotification(identifier: string): Promise<void> {
      ifExistStop(identifier);
    },

    async setNotification(
      identifier: string,
      goalTime: Date,
      callback: () => Promise<void>,
      setToGoalTime: boolean = true,
      intervalMs: number = 60 * 60 * 1000,
      count: number = 0,
    ): Promise<void> {
      ifExistStop(identifier);

      let i;
      let iCount = count;

      if (!setToGoalTime) {
        i = 1;
        iCount++;
      } else {
        i = 0;
      }

      for (i; i <= iCount; i++) {
        const notifyAt = new Date(goalTime.getTime() - intervalMs * i);
        await createNotification(identifier, callback, notifyAt);
      }
    },
  };
}
