import { IUserLimits } from '../../../repos/limits/userLimits.repo';

export async function checkCreatedWorkSpaceLimit(userLimitsRepo: IUserLimits, userId: string): Promise<boolean> {
  const limits = await userLimitsRepo.getUserLimits(userId);
  return limits.maxCreatedWorkspaces > limits.createdWorkSpaces;
}
