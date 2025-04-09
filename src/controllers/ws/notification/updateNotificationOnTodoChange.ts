import { INotificationService } from '../../../services/notification/INotificationService';
import { IMailSender } from '../../../services/mailSender/IMailSender';
import { WorkSpaceTodoEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { cancelTodoNotifications } from './cancelTodoNotifications';
import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { setTodoNotifications } from './setTodoNotifications';

export async function updateNotificationOnTodoChange(
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  notification: INotificationService,
  mailerSender: IMailSender,
  newTodoData: Partial<WorkSpaceTodoEntity>,
  todoId: string,
) {
  if (newTodoData.eliminatedDate === null || newTodoData.completed) {
    await cancelTodoNotifications(workSpaceTodoRepo, notification, todoId);
  } else if (newTodoData.eliminatedDate) {
    await setTodoNotifications(workSpaceTodoRepo, notification, mailerSender, todoId);
  }
}
