import { IWorkSpaceTagTodoRepo } from '../../../repos/workspace/tagTodo/workSpaceTagTodo.repo';

export async function addTagToTodo(
  workSpaceTagTodoRepo: IWorkSpaceTagTodoRepo,
  todoId: string,
  tagId: string,
  userId: string,
) {
  await workSpaceTagTodoRepo.addTag(todoId, tagId, userId);
}
