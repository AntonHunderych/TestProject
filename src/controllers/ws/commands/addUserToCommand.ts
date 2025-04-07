import { IWorkSpaceUserCommandRepo } from '../../../repos/workspace/userCommand/workSpaceUserCommand.repo';

export async function addUserToCommand(
  workSpaceUserCommandRepo: IWorkSpaceUserCommandRepo,
  userId: string,
  commandId: string,
): Promise<void> {
  await workSpaceUserCommandRepo.addUser(userId, commandId);
}
