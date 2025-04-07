import { IWorkSpaceTagRepo } from '../../../repos/workspace/tags/workSpaceTags.repo';

export async function createTag(
  workSpaceTagRepo: IWorkSpaceTagRepo,
  workSpaceId: string,
  userId: string,
  value: string,
) {
  return await workSpaceTagRepo.createTag(workSpaceId, userId, value);
}
