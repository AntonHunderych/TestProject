import { INotificationService } from '../../../services/notification/INotificationService';
import { WorkSpaceTodoEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { setNotificationToUser } from './setNotificationToUser';
import { TNotificationData } from '../../../types/TNotificationData';

export async function setNotificationToUsers(
  notification: INotificationService,
  todo: WorkSpaceTodoEntity,
  data: TNotificationData[],
) {
  const notifications = data.map((notificationData) =>
    setNotificationToUser(
      notification,
      todo.id + notificationData.userId,
      todo.eliminatedDate,
      notificationData.callback,
    ),
  );
  await Promise.all(notifications);
}
