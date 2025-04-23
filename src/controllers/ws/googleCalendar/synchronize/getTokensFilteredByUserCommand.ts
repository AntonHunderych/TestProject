import { WorkSpaceGoogleCalendarTokenEntity } from '../../../../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarTokenEntity';
import { IWorkSpaceGoogleCalendarToken } from '../../../../repos/workspace/googleCalendarToken/workSpaceGoogleCalendarToken.repo';

export async function getTokensFilteredByUserCommand(
  todoCommandId: string | null,
  todoId: string,
  workSpaceId: string,
  workSpaceGoogleCalendarTokenRepo: IWorkSpaceGoogleCalendarToken,
): Promise<WorkSpaceGoogleCalendarTokenEntity[]> {
  const tokensWithUserData = await workSpaceGoogleCalendarTokenRepo.getTokensWithUserCommand(workSpaceId, todoId);

  return todoCommandId
    ? tokensWithUserData.filter((token) => {
        return token.user.commands.some((userCommand) => userCommand.command.id === todoCommandId);
      })
    : tokensWithUserData;
}
