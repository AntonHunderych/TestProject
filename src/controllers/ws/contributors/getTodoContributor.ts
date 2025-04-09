import { ITodoContributorRepo } from '../../../repos/workspace/todoContributor/todoContributor.repo';

export async function getTodoContributor(
  workSpaceContributors: ITodoContributorRepo,
  todoId: string,
  workSpaceUserId: string,
) {
  return await workSpaceContributors.getTodoContributor(todoId, workSpaceUserId);
}
