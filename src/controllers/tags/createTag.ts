import { ITagsRepo } from '../../repos/tags/tags.repo';
import { Tag } from '../../db/entities/TagEntity';

export async function createTag(tagRepo: ITagsRepo, userId: string, value: string): Promise<Tag> {
  return await tagRepo.createTag(userId, value);
}
