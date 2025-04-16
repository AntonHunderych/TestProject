import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { WorkSpaceTodoEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';

export async function updateTodo(
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  todoId: string,
  data: Partial<WorkSpaceTodoEntity>,
) {
  return await workSpaceTodoRepo.update(todoId, data);
}
