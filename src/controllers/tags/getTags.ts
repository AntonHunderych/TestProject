import { ITagsRepo } from '../../repos/tags/tags.repo';
import { Tag } from '../../services/typeorm/entities/TagEntity';

export async function getTags(tagRepo: ITagsRepo, userId: string): Promise<Tag[]> {
  return await tagRepo.getTags(userId);
}
