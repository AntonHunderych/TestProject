import { DataSource, Repository } from 'typeorm';
import { WorkSpaceComment } from '../../../db/entities/WorkSpaceComment';
import { DBError } from '../../../Types/Errors/DBError';

export interface IWorkSpaceCommentRepos {
  createComment(commentData: Partial<WorkSpaceComment>): Promise<WorkSpaceComment>;
  getCommentById(id: string): Promise<WorkSpaceComment>;
  updateComment(id: string, updateData: Partial<WorkSpaceComment>): Promise<WorkSpaceComment>;
  deleteComment(id: string): Promise<void>;
  getCommentsByTodoId(todoId: string): Promise<WorkSpaceComment[]>;
}

export function getWorkSpaceCommentRepos(db: DataSource): IWorkSpaceCommentRepos {
  const commentRepo: Repository<WorkSpaceComment> = db.getRepository(WorkSpaceComment);

  return {
    async createComment(commentData: Partial<WorkSpaceComment>): Promise<WorkSpaceComment> {
      try {
        console.log(commentData);
        return await commentRepo.save(commentData);
      } catch (error) {
        throw new DBError('Error creating comment', error);
      }
    },

    async getCommentById(id: string): Promise<WorkSpaceComment> {
      try {
        return await commentRepo.findOneOrFail({ where: { id } });
      } catch (error) {
        throw new DBError('Error fetching comment by id', error);
      }
    },

    async updateComment(id: string, updateData: Partial<WorkSpaceComment>): Promise<WorkSpaceComment> {
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

    async getCommentsByTodoId(todoId: string): Promise<WorkSpaceComment[]> {
      try {
        return await commentRepo.find({ where: { todo: { id: todoId } } });
      } catch (error) {
        throw new DBError('Error fetching comments by todo id', error);
      }
    },
  };
}
