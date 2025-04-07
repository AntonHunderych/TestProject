import { IWorkSpaceCommandRepo } from '../../../repos/workspace/commands/workSpaceCommand.repo';

export async function deleteCommand(workSpaceCommandRepo: IWorkSpaceCommandRepo, commandId: string): Promise<void> {
  return await workSpaceCommandRepo.deleteCommand(commandId);
}
