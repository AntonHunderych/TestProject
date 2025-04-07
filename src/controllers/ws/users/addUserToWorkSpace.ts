import { IWorkSpaceUserRepo } from '../../../repos/workspace/user/workSpaceUser.repo';

export async function addUserToWorkSpace(workSpaceUserRepo: IWorkSpaceUserRepo, workSpaceId: string, userId: string) {
  return await workSpaceUserRepo.addUserToWorkSpace(workSpaceId, userId);
}
