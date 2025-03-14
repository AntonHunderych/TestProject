import { IComment } from '../../db/schemas/CommentSchema';
import { DataSource } from 'typeorm';
import { Comment } from '../../db/entities/CommentEntity';
import { DBError } from '../../Types/Errors/DBError';

export type ICreateComment = Omit<IComment, 'createdAt' | 'updatedAt' | 'id'>;
export type IUpdateComment = Pick<IComment, 'text'>;

export interface ICommentsRepo {
  createComment: (data: ICreateComment) => Promise<IComment>;
  getCommentById: (id: string) => Promise<IComment>;
  getAllComments: () => Promise<IComment[]>;
  updateComment: (id: string, data: IUpdateComment) => Promise<IComment>;
  deleteComment: (id: string) => Promise<boolean>;
  getAllTodoComments: (id: string) => Promise<IComment[]>;
}

export const getCommentsRepo = (db: DataSource): ICommentsRepo => {
  const commentRepo = db.getRepository(Comment);

  return {
    async getAllTodoComments(id: string): Promise<IComment[]> {
      try {
        return await commentRepo.find({ where: { todoId: id }, relations: { author: true } });
      } catch (error) {
        throw new DBError('Error fetching todo comments', error);
      }
    },
    async createComment(data: ICreateComment): Promise<IComment> {
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
    async getAllComments(): Promise<IComment[]> {
      try {
        return await commentRepo.find();
      } catch (error) {
        throw new DBError('Error fetching all comments', error);
      }
    },
    async getCommentById(id: string): Promise<IComment> {
      try {
        return await commentRepo.findOneOrFail({ where: { id } });
      } catch (error) {
        throw new DBError('Error fetching comment by id', error);
      }
    },
    async updateComment(id: string, data: IUpdateComment): Promise<IComment> {
      try {
        const comment = await commentRepo.findOneOrFail({ where: { id } });
        Object.assign(comment, data);
        return commentRepo.save(comment);
      } catch (error) {
        throw new DBError('Error updating comment', error);
      }
    },
  };
};


