import { INotificationService } from '../../../services/notification/INotificationService';

export async function setNotificationToUser(
  notification: INotificationService,
  identifier: string,
  eliminatedDate: Date | undefined | null,
  callback: () => Promise<void>,
) {
  if (eliminatedDate === null || eliminatedDate === undefined) {
    return;
  }
  await notification.setNotification(identifier, eliminatedDate, callback, false);
}
