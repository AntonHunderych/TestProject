import { IWorkSpaceCommandRepo } from '../../../repos/workspace/commands/workSpaceCommand.repo';
import { IWorkSpaceCommand } from '../../../types/entities/WorkSpace/WorkSpaceCommandSchema';

export async function createCommand(
  workSpaceCommandRepo: IWorkSpaceCommandRepo,
  workSpaceId: string,
  value: string,
): Promise<IWorkSpaceCommand> {
  return await workSpaceCommandRepo.createCommand(workSpaceId, value);
}
