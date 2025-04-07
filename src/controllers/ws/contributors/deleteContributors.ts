import { ITodoContributorRepo } from '../../../repos/workspace/todoContributor/todoContributor.repo';

export async function deleteContributor(workSpaceContributors: ITodoContributorRepo, userId: string, todoId: string) {
  await workSpaceContributors.deleteContributor(userId, todoId);
}
