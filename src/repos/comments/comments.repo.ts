import { DataSource, EntityManager } from 'typeorm';
import { CommentEntity } from '../../services/typeorm/entities/CommentEntity';
import { DBError } from '../../types/errors/DBError';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';
import { Comment } from '../../types/entities/CommentSchema';

export type ICreateComment = Omit<Comment, 'createdAt' | 'updatedAt' | 'id'>;
export type IUpdateComment = Pick<Comment, 'text'>;

export interface ICommentsRepo extends IRecreateRepo {
  createComment: (data: ICreateComment) => Promise<Comment>;
  getCommentById: (id: string) => Promise<Comment>;
  getAllComments: () => Promise<Comment[]>;
  updateComment: (id: string, data: IUpdateComment) => Promise<Comment>;
  deleteComment: (id: string) => Promise<boolean>;
  getAllTodoComments: (id: string) => Promise<Comment[]>;
}

export const getCommentRepo = (db: DataSource | EntityManager): ICommentsRepo => {
  const commentRepo = db.getRepository(CommentEntity);

  return {
    async getAllTodoComments(id: string): Promise<Comment[]> {
      try {
        return await commentRepo.find({ where: { todoId: id }, relations: { author: true } });
      } catch (error) {
        throw new DBError('Error fetching todo comments', error);
      }
    },
    async createComment(data: ICreateComment): Promise<Comment> {
      try {
        return await commentRepo.save(data);
      } catch (error) {
        throw new DBError('Error creating comment', error);
      }
    },
    async deleteComment(id: string): Promise<boolean> {
      try {
        return !!(await commentRepo.delete(id));
      } catch (error) {
        throw new DBError('Error deleting comment', error);
      }
    },
    async getAllComments(): Promise<Comment[]> {
      try {
        return await commentRepo.find();
      } catch (error) {
        throw new DBError('Error fetching all comments', error);
      }
    },
    async getCommentById(id: string): Promise<Comment> {
      try {
        return await commentRepo.findOneOrFail({ where: { id } });
      } catch (error) {
        throw new DBError('Error fetching comment by id', error);
      }
    },
    async updateComment(id: string, data: IUpdateComment): Promise<Comment> {
      try {
        const comment = await commentRepo.findOneOrFail({ where: { id } });
        Object.assign(comment, data);
        return commentRepo.save(comment);
      } catch (error) {
        throw new DBError('Error updating comment', error);
      }
    },
    __recreateFunction: getCommentRepo,
  };
};
