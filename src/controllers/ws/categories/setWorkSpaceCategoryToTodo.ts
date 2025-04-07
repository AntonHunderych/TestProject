import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';

export async function setWorkSpaceCategoryToTodo(
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  todoId: string,
  categoryId: string,
  userId: string,
): Promise<void> {
  await workSpaceTodoRepo.setCategoryToTodo(todoId, categoryId, userId);
}
