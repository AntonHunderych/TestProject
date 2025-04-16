import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { WorkSpaceTodo } from '../../../types/entities/WorkSpace/WorkSpaceTodoSchema';
import { ECalendarQueueEvents } from '../../../types/enum/ECalendarQueue';
import { AddCalendarJob } from '../../../services/queue/calendar/calendarQueue';
import { createTodo } from './createTodo';

export async function createTodoProcess(
  workSpaceTodo: IWorkSpaceTodoRepo,
  data: Partial<WorkSpaceTodo>,
  workSpaceId: string,
  userId: string,
  addCalendarJob: typeof AddCalendarJob,
) {
  const todo = await createTodo(workSpaceTodo, data, workSpaceId, userId);
  await addCalendarJob(ECalendarQueueEvents.insertTodoSynchronize, {
    workSpaceId,
    todo,
  });
  return todo;
}
