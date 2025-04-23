import { ECalendarQueueEvents } from '../../../types/enum/ECalendarQueue';
import { removeCommandFromTodo } from './removeCommandFromTodo';
import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { AddCalendarJob } from '../../../services/queue/calendar/calendarQueue';
import { IWorkSpaceCommandTodoRepo } from '../../../repos/workspace/commandsTodo/workSpaceCommandsTodo.repo';

export async function removeCommandFromTodoProcess(
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  addCalendarJob: typeof AddCalendarJob,
  workSpaceId: string,
  workSpaceCommandTodoRepo: IWorkSpaceCommandTodoRepo,
  todoId: string,
) {
  const todo = await workSpaceTodoRepo.findById(todoId);
  await removeCommandFromTodo(workSpaceCommandTodoRepo, todoId);
  const pastCommandId = todo.commandId;
  todo.commandId = null;
  await addCalendarJob(ECalendarQueueEvents.updateTodoCommandSynchronize, {
    workSpaceId,
    todo,
    pastCommandId: pastCommandId as string,
  });
}
