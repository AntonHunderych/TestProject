import { IWorkSpaceTodoRepo } from '../../../repos/workspace/todos/workSpaceTodos.repo';
import { WorkSpaceTodoEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { IWorkSpaceUserCommandRepo } from '../../../repos/workspace/userCommand/workSpaceUserCommand.repo';

export async function getAllTodoInWorkSpaceByCommand(
  workSpaceTodoRepo: IWorkSpaceTodoRepo,
  workSpaceUserCommandRepo: IWorkSpaceUserCommandRepo,
  workSpaceId: string,
  userId: string,
): Promise<WorkSpaceTodoEntity[]> {
  const userCommands = await workSpaceUserCommandRepo.getUserCommands(userId);
  return await workSpaceTodoRepo.findAllTodoInWorkSpaceByCommand(
    workSpaceId,
    userCommands.map((command) => command.value),
  );
}
