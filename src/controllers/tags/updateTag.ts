import { Tag } from '../../services/typeorm/entities/TagEntity';
import { ITagsRepo } from '../../repos/tags/tags.repo';

export async function updateTag(tagRepo: ITagsRepo, tagId: string, value: string): Promise<Tag> {
  return await tagRepo.updateTag(tagId, value);
}
