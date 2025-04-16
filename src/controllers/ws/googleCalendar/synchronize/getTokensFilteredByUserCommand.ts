import { WorkSpaceGoogleCalendarTokenEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarTokenEntity';
import { IWorkSpaceGoogleCalendarToken } from '../../../../repos/workspace/googleCalendarToken/workSpaceGoogleCalendarToken.repo';
import { WorkSpaceCommandEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceCommandEntity';

export async function getTokensFilteredByUserCommand(
  todoCommand: WorkSpaceCommandEntity | null,
  todoId: string,
  workSpaceId: string,
  workSpaceGoogleCalendarTokenRepo: IWorkSpaceGoogleCalendarToken,
): Promise<WorkSpaceGoogleCalendarTokenEntity[]> {
  const tokensWithUserData = await workSpaceGoogleCalendarTokenRepo.getTokensWithUserCommand(workSpaceId, todoId);

  return todoCommand
    ? tokensWithUserData.filter((token) =>
        token.user.commands.some((userCommand) => userCommand.command === todoCommand),
      )
    : tokensWithUserData;
}
