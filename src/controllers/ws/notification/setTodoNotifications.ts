import { INotificationService } from '../../../services/notification/INotificationService';
import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { setNotificationToUsers } from './setNotificationToUsers';
import { IMailSender } from '../../../services/mailSender/IMailSender';
import { sendNotificationEmailToContributor } from './sendNotificationEmailToContributor';
import { TNotificationData } from '../../../types/TNotificationData';

export async function setTodoNotifications(
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  notification: INotificationService,
  mailService: IMailSender,
  todoId: string,
) {
  const todoWithContributors = await workSpaceTodoRepo.getTodoWithContributors(todoId);
  const notificationData: TNotificationData[] = todoWithContributors.contributors.map((contributor) => {
    return {
      userId: contributor.userId,
      callback: () => sendNotificationEmailToContributor(mailService, todoWithContributors, contributor.user),
    };
  });

  await setNotificationToUsers(notification, todoWithContributors, notificationData);
}
