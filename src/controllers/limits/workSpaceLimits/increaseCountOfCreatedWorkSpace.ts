import { IUserLimits } from '../../../repos/limits/userLimits.repo';

export async function increaseCountOfCreatedWorkSpace(userLimitsRepo: IUserLimits, userId: string): Promise<void> {
  const limits = await userLimitsRepo.getUserLimits(userId);
  await userLimitsRepo.updateUserLimits(userId, {
    createdWorkSpaces: ++limits.createdWorkSpaces,
  });
}
