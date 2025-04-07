import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';

export async function removeWorkSpaceCategory(workSpaceTodoRepo: IWorkSpaceTodoRepo, todoId: string): Promise<void> {
  await workSpaceTodoRepo.removeCategoryTodo(todoId);
}
