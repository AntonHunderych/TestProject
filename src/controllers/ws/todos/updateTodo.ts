import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { WorkSpaceTodo } from '../../../types/entities/WorkSpace/WorkSpaceTodoSchema';

export async function updateTodo(workSpaceTodoRepo: IWorkSpaceTodoRepo, todoId: string, data: Partial<WorkSpaceTodo>) {
  return await workSpaceTodoRepo.update(todoId, data);
}
