import { ITodoContributorRepo } from '../../../repos/workspace/todoContributor/todoContributor.repo';

export async function getTodoContributor(workSpaceContributors: ITodoContributorRepo, todoId: string) {
  await workSpaceContributors.getTodoContributor(todoId);
}
