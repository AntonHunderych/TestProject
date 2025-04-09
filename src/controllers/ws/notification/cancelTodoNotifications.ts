import { INotificationService } from '../../../services/notification/INotificationService';
import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';

export async function cancelTodoNotifications(
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  notification: INotificationService,
  todoId: string,
) {
  const todoWithContributors = await workSpaceTodoRepo.getTodoWithContributors(todoId);

  const cancelPromises = todoWithContributors.contributors.map((contributor) =>
    notification.cancelNotification(todoWithContributors.id + contributor.userId),
  );

  await Promise.all(cancelPromises);
}
