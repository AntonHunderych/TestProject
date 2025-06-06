import { TagEntity } from '../../services/typeorm/entities/TagEntity';
import { DataSource, EntityManager } from 'typeorm';
import { DBError } from '../../types/errors/DBError';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';

export interface ITagsRepo extends IRecreateRepo {
  getTags(userId: string): Promise<TagEntity[]>;

  createTag(userId: string, value: string): Promise<TagEntity>;

  updateTag(tagId: string, value: string): Promise<TagEntity>;

  deleteTag(tagId: string): Promise<void>;
}

export function getTagRepo(db: DataSource | EntityManager): ITagsRepo {
  const tagRepo = db.getRepository<TagEntity>(TagEntity);

  return {
    async getTags(userId: string): Promise<TagEntity[]> {
      try {
        return await tagRepo.find({ where: { userId } });
      } catch (error) {
        throw new DBError('Failed to get tags', error);
      }
    },
    async createTag(userId: string, value: string): Promise<TagEntity> {
      try {
        const newTag = tagRepo.create({ userId, value });
        return await tagRepo.save(newTag);
      } catch (error) {
        throw new DBError('Failed to create tag', error);
      }
    },
    async updateTag(tagId: string, value: string): Promise<TagEntity> {
      try {
        const tag = await tagRepo.findOneOrFail({ where: { id: tagId } });
        if (!tag) {
          throw new Error('Tag not found');
        }
        tag.value = value;
        return await tagRepo.save(tag);
      } catch (error) {
        throw new DBError('Failed to update tag', error);
      }
    },
    async deleteTag(tagId: string): Promise<void> {
      try {
        const tag = await tagRepo.findOne({ where: { id: tagId } });
        if (!tag) {
          throw new Error('Tag not found');
        }
        await tagRepo.remove(tag);
      } catch (error) {
        throw new DBError('Failed to delete tag', error);
      }
    },
    __recreateFunction: getTagRepo,
  };
}
