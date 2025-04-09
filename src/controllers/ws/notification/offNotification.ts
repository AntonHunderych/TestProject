import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { INotificationService } from '../../../services/notification/INotificationService';
import { cancelTodoNotifications } from './cancelTodoNotifications';

export async function offNotification(
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  notification: INotificationService,
  todoId: string,
) {
  await workSpaceTodoRepo.update(todoId, { notification: false });
  await cancelTodoNotifications(workSpaceTodoRepo, notification, todoId);
}
