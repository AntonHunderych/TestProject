import { ITagsRepo } from '../../repos/tags/tags.repo';
import { TagEntity } from '../../services/typeorm/entities/TagEntity';

export async function createTag(tagRepo: ITagsRepo, userId: string, value: string): Promise<TagEntity> {
  return await tagRepo.createTag(userId, value);
}
