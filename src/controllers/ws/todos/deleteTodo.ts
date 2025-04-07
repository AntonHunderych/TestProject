import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';

export async function deleteTodo(workSpaceTodo: IWorkSpaceTodoRepo, todoId: string) {
  return await workSpaceTodo.delete(todoId);
}
