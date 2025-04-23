import { IWorkSpaceCommandTodoRepo } from '../../../repos/workspace/commandsTodo/workSpaceCommandsTodo.repo';
import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { AddCalendarJob } from '../../../services/queue/calendar/calendarQueue';
import { ECalendarQueueEvents } from '../../../types/enum/ECalendarQueue';
import { addCommandToTodo } from './addCommandToTodo';

export async function addCommandToTodoProcess(
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  addCalendarJob: typeof AddCalendarJob,
  workSpaceId: string,
  workSpaceCommandTodoRepo: IWorkSpaceCommandTodoRepo,
  todoId: string,
  commandId: string,
) {
  const todo = await workSpaceTodoRepo.findById(todoId);
  await addCommandToTodo(workSpaceCommandTodoRepo, todoId, commandId);
  const pastCommandId = todo.commandId;
  todo.commandId = commandId;
  await addCalendarJob(ECalendarQueueEvents.updateTodoCommandSynchronize, {
    workSpaceId,
    todo,
    pastCommandId: pastCommandId as string,
  });
}
