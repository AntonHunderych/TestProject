import { Tag } from '../../db/entities/TagEntity';
import { DataSource } from 'typeorm';
import { Todo } from '../../db/entities/TodoEntity';
import { DBError } from '../../types/Errors/DBError';

export interface IGetTagsRepos {
  getTags(userId: string): Promise<Tag[]>;

  createTag(userId: string, value: string): Promise<Tag>;

  updateTag(tagId: string, value: string): Promise<Tag>;

  deleteTag(tagId: string): Promise<void>;

  addTag(todoId: string, tagId: string): Promise<void>;

  removeTag(todoId: string, tagId: string): Promise<void>;
}

export function getTagsRepos(db: DataSource): IGetTagsRepos {

  const tagRepo = db.getRepository<Tag>(Tag);

  return {
    async getTags(userId: string): Promise<Tag[]> {
      try {
        return await tagRepo.find({ where: { userId: userId } });
      } catch (error) {
        throw new DBError('Failed to get tags', error);
      }
    },
    async createTag(userId: string, value: string): Promise<Tag> {
      try {
        const newTag = tagRepo.create({ userId: userId, value: value });
        return await tagRepo.save(newTag);
      } catch (error) {
        throw new DBError('Failed to create tag', error);
      }
    },
    async updateTag(tagId: string, value: string): Promise<Tag> {
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
    async addTag(todoId: string, tagId: string): Promise<void> {
      try {
        const tag = await tagRepo.findOneOrFail({
          where: { id: tagId },
          relations: { todos: true }
        });
        const todo = new Todo();
        todo.id = todoId;
        tag.todos = [...(tag.todos ?? []), todo];
        await tagRepo.save(tag);
      } catch (error) {
        throw new DBError('Failed to add tag', error);
      }
    }, async removeTag(todoId: string, tagId: string): Promise<void> {
      try {
        const tags = await tagRepo.find({ where: { id: todoId } });
        for (const tag of tags) {
          if (tag.id === tagId) {
            await tagRepo.remove(tag);
          }
        }
      } catch (error) {
        throw new DBError('Failed to remove tag', error);
      }
    }

  };
}