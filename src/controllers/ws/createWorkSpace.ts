import { IWorkSpaceRepos } from '../../repos/workspace/workspace.repo';
import { IWorkSpace } from '../../types/entities/WorkSpaceSchema';

export async function createWorkSpace(
  workSpaceRepo: IWorkSpaceRepos,
  data: Omit<IWorkSpace, 'id'>,
): Promise<IWorkSpace> {
  return await workSpaceRepo.createWorkSpace(data);
}
