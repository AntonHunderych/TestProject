import { DataSource, EntityManager, Repository } from 'typeorm';
import { WorkSpaceCommentEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceCommentEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';

export interface IWorkSpaceCommentRepos extends IRecreateRepo {
  createComment(commentData: Partial<WorkSpaceCommentEntity>): Promise<WorkSpaceCommentEntity>;
  getCommentById(id: string): Promise<WorkSpaceCommentEntity>;
  updateComment(id: string, updateData: Partial<WorkSpaceCommentEntity>): Promise<WorkSpaceCommentEntity>;
  deleteComment(id: string): Promise<void>;
  getCommentsByTodoId(todoId: string): Promise<WorkSpaceCommentEntity[]>;
}

export function getWorkSpaceCommentRepos(db: DataSource | EntityManager): IWorkSpaceCommentRepos {
  const commentRepo: Repository<WorkSpaceCommentEntity> = db.getRepository(WorkSpaceCommentEntity);

  return {
    async createComment(commentData: Partial<WorkSpaceCommentEntity>): Promise<WorkSpaceCommentEntity> {
      try {
        return await commentRepo.save(commentData);
      } catch (error) {
        throw new DBError('Error creating comment', error);
      }
    },

    async getCommentById(id: string): Promise<WorkSpaceCommentEntity> {
      try {
        return await commentRepo.findOneOrFail({ where: { id } });
      } catch (error) {
        throw new DBError('Error fetching comment by id', error);
      }
    },

    async updateComment(id: string, updateData: Partial<WorkSpaceCommentEntity>): Promise<WorkSpaceCommentEntity> {
      try {
        const comment = await commentRepo.findOneOrFail({ where: { id } });
        Object.assign(comment, updateData);
        return await commentRepo.save(comment);
      } catch (error) {
        throw new DBError('Error updating comment', error);
      }
    },

    async deleteComment(id: string): Promise<void> {
      try {
        await commentRepo.delete(id);
      } catch (error) {
        throw new DBError('Error deleting comment', error);
      }
    },

    async getCommentsByTodoId(todoId: string): Promise<WorkSpaceCommentEntity[]> {
      try {
        return await commentRepo.find({ where: { todo: { id: todoId } } });
      } catch (error) {
        throw new DBError('Error fetching comments by todo id', error);
      }
    },
    __recreateFunction: getWorkSpaceCommentRepos,
  };
}
