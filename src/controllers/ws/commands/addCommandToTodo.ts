import { IWorkSpaceCommandTodoRepo } from '../../../repos/workspace/commandsTodo/workSpaceCommandsTodo.repo';

export async function addCommandToTodo(
  workSpaceCommandTodoRepo: IWorkSpaceCommandTodoRepo,
  todoId: string,
  commandId: string,
) {
  await workSpaceCommandTodoRepo.addCommandToTodo(todoId, commandId);
}
