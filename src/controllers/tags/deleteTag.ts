import { ITagsRepo } from '../../repos/tags/tags.repo';

export async function deleteTag(tagRepo: ITagsRepo, tagId: string): Promise<void> {
  return await tagRepo.deleteTag(tagId);
}
