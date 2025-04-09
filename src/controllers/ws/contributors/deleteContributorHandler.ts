import { ITodoContributorRepo } from '../../../repos/workspace/todoContributor/todoContributor.repo';
import { INotificationService } from '../../../services/notification/INotificationService';
import { deleteContributor } from './deleteContributors';
import { getTodoContributor } from './getTodoContributor';

export async function deleteContributorHandler(
  notification: INotificationService,
  workSpaceContributors: ITodoContributorRepo,
  userId: string,
  todoId: string,
) {
  await deleteContributor(workSpaceContributors, userId, todoId);
  const contributor = await getTodoContributor(workSpaceContributors, todoId, userId);
  if (contributor.todo.notification) {
    await notification.cancelNotification(todoId + userId);
  }
}
