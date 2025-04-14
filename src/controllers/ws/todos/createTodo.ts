import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { WorkSpaceTodo } from '../../../types/entities/WorkSpace/WorkSpaceTodoSchema';
import { WorkSpaceTodoEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';

export async function createTodo(
  workSpaceTodo: IWorkSpaceTodoRepo,
  data: Partial<WorkSpaceTodo>,
  workSpaceId: string,
  userId: string,
): Promise<WorkSpaceTodoEntity> {
  return await workSpaceTodo.create(data, workSpaceId, userId);
}
