import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { IWorkSpaceCommandsRepo } from '../../../repos/workspace/commands/workSpaceCommand.repo';
import { WorkSpaceTodo } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';

export async function getAllTodoInWorkSpaceByCommand(
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  workSpaceCommand: IWorkSpaceCommandsRepo,
  workSpaceId: string,
  userId: string,
): Promise<WorkSpaceTodo[]> {
  const userCommands = await workSpaceCommand.getUserCommands(userId, workSpaceId);
  return await workSpaceTodoRepo.findAllTodoInWorkSpaceByCommand(
    workSpaceId,
    userCommands.map((command) => command.value),
  );
}
