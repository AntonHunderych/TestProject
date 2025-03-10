import { IComment } from '../../db/schemas/CommentSchema';
import { DataSource } from 'typeorm';
import { Comment } from '../../db/entities/CommentEntity';

export type ICreateComment = Omit<IComment, 'createdAt' | 'updatedAt' | 'id'>
export type IUpdateComment = Pick<IComment,"text">

export interface ICommentsRepo {

  createComment: (data: ICreateComment) => Promise<IComment>;
  getCommentById: (id: string) => Promise<IComment>;
  getAllComments: () => Promise<IComment[]>;
  updateComment: (id: string, data: IUpdateComment) => Promise<IComment>;
  deleteComment: (id: string) => Promise<boolean>;
  getAllTodoComments: (id:string) => Promise<IComment[]>
}

export const getCommentsRepo = (db: DataSource): ICommentsRepo => {

  const commentRepo = db.getRepository(Comment);

  return {
    async getAllTodoComments(id: string): Promise<IComment[]> {
      return await commentRepo.find({where: {todoId: id},relations:{author:true}})
    },
    async createComment(data: ICreateComment): Promise<IComment> {
      return await commentRepo.save(data);
    },
    async deleteComment(id: string): Promise<boolean> {
      return !!await commentRepo.delete(id);
    },
    async getAllComments(): Promise<IComment[]> {
      return await commentRepo.find();
    },
    async getCommentById(id: string): Promise<IComment> {
      return await commentRepo.findOneOrFail({ where: { id } });
    },
    async updateComment(id: string, data: IUpdateComment): Promise<IComment> {
      const comment = await commentRepo.findOneOrFail({ where: { id } });
      Object.assign(comment, data);
      return commentRepo.save(comment);
    }
  };
};