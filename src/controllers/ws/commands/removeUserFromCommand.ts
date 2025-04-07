import { IWorkSpaceUserCommandRepo } from '../../../repos/workspace/userCommand/workSpaceUserCommand.repo';

export async function removeUserFromCommand(
  workSpaceUserCommandRepo: IWorkSpaceUserCommandRepo,
  workSpaceId: string,
  userId: string,
  commandId: string,
): Promise<void> {
  await workSpaceUserCommandRepo.removeUser(workSpaceId, userId, commandId);
}
