import { IWorkSpaceCommandRepo } from '../../../repos/workspace/commands/workSpaceCommand.repo';
import { IWorkSpaceCommand } from '../../../types/entities/WorkSpace/WorkSpaceCommandSchema';

export async function updateCommand(
  workSpaceCommandRepo: IWorkSpaceCommandRepo,
  commandId: string,
  value: string,
): Promise<IWorkSpaceCommand> {
  return await workSpaceCommandRepo.updateCommand(commandId, value);
}
