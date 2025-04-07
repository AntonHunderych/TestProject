import { IWorkSpaceCommandTodoRepo } from '../../../repos/workspace/commandsTodo/workSpaceCommandsTodo.repo';

export async function removeCommandFromTodo(workSpaceCommandTodoRepo: IWorkSpaceCommandTodoRepo, todoId: string) {
  await workSpaceCommandTodoRepo.removeCommandFromTodo(todoId);
}
