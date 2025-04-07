import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { WorkSpaceTodo } from '../../../types/entities/WorkSpace/WorkSpaceTodoSchema';

export async function createTodo(
  workSpaceTodo: IWorkSpaceTodoRepo,
  data: Partial<WorkSpaceTodo>,
  workSpaceId: string,
  userId: string,
): Promise<WorkSpaceTodo> {
  return await workSpaceTodo.create(data, workSpaceId, userId);
}
