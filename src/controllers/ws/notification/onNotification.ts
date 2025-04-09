import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { INotificationService } from '../../../services/notification/INotificationService';
import { IMailSender } from '../../../services/mailSender/IMailSender';
import { setTodoNotifications } from './setTodoNotifications';

export async function onNotification(
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  notification: INotificationService,
  mailService: IMailSender,
  todoId: string,
) {
  await workSpaceTodoRepo.update(todoId, { notification: true });
  await setTodoNotifications(workSpaceTodoRepo, notification, mailService, todoId);
}
