import { ITagsRepo } from '../../repos/tags/tags.repo';
import { TagEntity } from '../../services/typeorm/entities/TagEntity';

export async function getTags(tagRepo: ITagsRepo, userId: string): Promise<TagEntity[]> {
  return await tagRepo.getTags(userId);
}
