import { IWorkSpaceRepo } from '../../repos/workspace/workspace.repo';

export async function deleteWorkSpace(workSpaceRepo: IWorkSpaceRepo, workSpaceId: string) {
  return await workSpaceRepo.deleteWorkSpace(workSpaceId);
}
