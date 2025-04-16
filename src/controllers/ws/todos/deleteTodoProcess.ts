import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { AddCalendarJob } from '../../../services/queue/calendar/calendarQueue';
import { ECalendarQueueEvents } from '../../../types/enum/ECalendarQueue';
import { deleteTodo } from './deleteTodo';
import { getTokensFilteredByUserCommand } from '../googleCalendar/synchronize/getTokensFilteredByUserCommand';
import { IWorkSpaceGoogleCalendarToken } from '../../../repos/workspace/googleCalendarToken/workSpaceGoogleCalendarToken.repo';

export async function deleteTodoProcess(
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  workSpaceGoogleCalendarTokenRepo: IWorkSpaceGoogleCalendarToken,
  todoId: string,
  workSpaceId: string,
  addCalendarJob: typeof AddCalendarJob,
) {
  const workSpaceTodo = await workSpaceTodoRepo.findById(todoId);
  const tokensToProcess = await getTokensFilteredByUserCommand(
    workSpaceTodo.command,
    workSpaceTodo.id,
    workSpaceId,
    workSpaceGoogleCalendarTokenRepo,
  );
  await addCalendarJob(ECalendarQueueEvents.deleteTodoSynchronize, {
    todo: workSpaceTodo,
    tokensToProcess,
  });
  const todo = await deleteTodo(workSpaceTodoRepo, todoId);
  return !!todo;
}
