import { FastifyInstance } from 'fastify';
import { EUserLimits } from '../../../types/enum/EUserLimits';

export async function increaseMaxCreatedWorkSpace(f: FastifyInstance, userId: string, amount: number): Promise<void> {
  await f.withTransaction(
    {
      userLimitRepo: f.repos.userLimitRepo,
      limitChangeRepo: f.repos.limitChangeRepo,
    },
    async (repos) => {
      const limits = await repos.userLimitRepo.getUserLimits(userId);
      await repos.limitChangeRepo.logChange(
        userId,
        EUserLimits.maxCreatedWorkSpace,
        limits.maxCreatedWorkspaces,
        limits.maxCreatedWorkspaces + amount,
      );
      await repos.userLimitRepo.updateUserLimits(userId, {
        maxCreatedWorkspaces: limits.maxCreatedWorkspaces + amount,
      });
    },
  );
}
