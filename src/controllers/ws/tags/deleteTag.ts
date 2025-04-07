import { IWorkSpaceTagRepo } from '../../../repos/workspace/tags/workSpaceTags.repo';

export async function deleteTag(workSpaceTagRepo: IWorkSpaceTagRepo, tagId: string): Promise<void> {
  return await workSpaceTagRepo.deleteTag(tagId);
}
