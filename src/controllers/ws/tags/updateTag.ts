import { IWorkSpaceTagRepo } from '../../../repos/workspace/tags/workSpaceTags.repo';

export async function updateTag(workSpaceTagRepo: IWorkSpaceTagRepo, tagId: string, value: string) {
  return await workSpaceTagRepo.updateTag(tagId, value);
}
