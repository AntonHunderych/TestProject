import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { updateNotificationOnTodoChange } from '../notification/updateNotificationOnTodoChange';
import { INotificationService } from '../../../services/notification/INotificationService';
import { IMailSender } from '../../../services/mailSender/IMailSender';
import { WorkSpaceTodoEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';

export async function updateTodo(
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  notificationService: INotificationService,
  mailerSender: IMailSender,
  todoId: string,
  data: Partial<WorkSpaceTodoEntity>,
) {
  const newTodo = await workSpaceTodoRepo.update(todoId, data);
  if (newTodo.notification) {
    await updateNotificationOnTodoChange(workSpaceTodoRepo, notificationService, mailerSender, data, todoId);
  }
  return newTodo;
}
