import { IWorkSpaceRepo } from '../../repos/workspace/workspace.repo';

export async function getWorkSpaceById(workSpaceRepo: IWorkSpaceRepo, workSpaceId: string) {
  return await workSpaceRepo.getWorkSpaceById(workSpaceId);
}
