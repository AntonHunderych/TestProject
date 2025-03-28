import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceTag, WorkSpaceTagTodo } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTagEntity';
import { DBError } from '../../../types/errors/DBError';
import { WorkSpaceUser } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceUserEntity';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IGetWorkSpaceTagRepo extends IRecreateRepo {
  getTags(userId: string): Promise<WorkSpaceTag[]>;

  createTag(workSpaceId: string, userId: string, value: string): Promise<WorkSpaceTag>;

  updateTag(userId: string, value: string): Promise<WorkSpaceTag>;

  deleteTag(userId: string): Promise<void>;

  addTag(todoId: string, tagId: string, userId: string, workSpaceId: string): Promise<void>;

  removeTag(todoId: string, tagId: string): Promise<void>;
}

export function getWorkSpaceTagRepo(db: DataSource | EntityManager): IGetWorkSpaceTagRepo {
  const workSpaceTagRepo = db.getRepository<WorkSpaceTag>(WorkSpaceTag);
  const workSpaceTagTodoRepo = db.getRepository<WorkSpaceTagTodo>(WorkSpaceTagTodo);

  return {
    async getTags(workSpaceId: string): Promise<WorkSpaceTag[]> {
      try {
        return await workSpaceTagRepo.find({ where: { workSpaceId } });
      } catch (error) {
        throw new DBError('Failed to get tags', error);
      }
    },
    async createTag(workSpaceId: string, userId: string, value: string): Promise<WorkSpaceTag> {
      try {
        const newTag = workSpaceTagRepo.create({ workSpaceId, creatorId: userId, value });
        return await workSpaceTagRepo.save(newTag);
      } catch (error) {
        throw new DBError('Failed to create tag', error);
      }
    },
    async updateTag(tagId: string, value: string): Promise<WorkSpaceTag> {
      try {
        const tag = await workSpaceTagRepo.findOneOrFail({ where: { id: tagId } });
        if (!tag) {
          throw new Error('Tag not found');
        }
        tag.value = value;
        return await workSpaceTagRepo.save(tag);
      } catch (error) {
        throw new DBError('Failed to update tag', error);
      }
    },
    async deleteTag(tagId: string): Promise<void> {
      try {
        const tag = await workSpaceTagRepo.findOne({ where: { id: tagId } });
        if (!tag) {
          throw new Error('Tag not found');
        }
        await workSpaceTagRepo.remove(tag);
      } catch (error) {
        throw new DBError('Failed to delete tag', error);
      }
    },
    async addTag(todoId: string, tagId: string, userId: string, workSpaceId: string): Promise<void> {
      try {
        const user: WorkSpaceUser = new WorkSpaceUser();
        user.userId = userId;
        user.workSpaceId = workSpaceId;
        await workSpaceTagTodoRepo.save({
          todoId,
          tagId,
          assignedBy: user,
        });
      } catch (error) {
        throw new DBError('Failed to add tag', error);
      }
    },
    async removeTag(todoId: string, tagId: string): Promise<void> {
      try {
        await workSpaceTagTodoRepo.delete({ todoId, tagId });
      } catch (error) {
        throw new DBError('Failed to remove tag', error);
      }
    },
    __recreateFunction: getWorkSpaceTagRepo,
  };
}
