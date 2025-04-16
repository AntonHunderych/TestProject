import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { INotificationService } from '../../../services/notification/INotificationService';
import { IMailSender } from '../../../services/mailSender/IMailSender';
import { WorkSpaceTodoEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { updateNotificationOnTodoChange } from '../notification/updateNotificationOnTodoChange';
import { updateTodo } from './updateTodo';
import { AddCalendarJob } from '../../../services/queue/calendar/calendarQueue';
import { ECalendarQueueEvents } from '../../../types/enum/ECalendarQueue';

export async function updateTodoProcess(
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  notificationService: INotificationService,
  mailerSender: IMailSender,
  todoId: string,
  data: Partial<WorkSpaceTodoEntity>,
  addCalendarJob: typeof AddCalendarJob,
) {
  const newTodo = await updateTodo(workSpaceTodoRepo, todoId, data);
  if (newTodo.notification) {
    await updateNotificationOnTodoChange(workSpaceTodoRepo, notificationService, mailerSender, data, todoId);
  }
  await addCalendarJob(ECalendarQueueEvents.updateTodoSynchronize, {
    workSpaceId: newTodo.workSpaceId,
    todo: newTodo,
    newTodoData: data,
  });
  return newTodo;
}
