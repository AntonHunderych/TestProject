import { IWorkSpaceTagTodoRepo } from '../../../repos/workspace/tagTodo/workSpaceTagTodo.repo';

export async function removeWorkSpaceTagFromTodo(
  workSpaceTagTodoRepo: IWorkSpaceTagTodoRepo,
  todoId: string,
  tagId: string,
) {
  await workSpaceTagTodoRepo.removeTag(todoId, tagId);
}
