import { ITodoContributorRepo } from '../../../repos/workspace/todoContributor/todoContributor.repo';

export async function addContributors(workSpaceContributors: ITodoContributorRepo, userId: string, todoId: string) {
  return await workSpaceContributors.addContributor(userId, todoId);
}
