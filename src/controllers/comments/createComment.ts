import { ICommentsRepo, ICreateComment } from '../../repos/comments/comments.repo';
import { Comment } from '../../types/entities/CommentSchema';

export async function createComment(commentRepo: ICommentsRepo, data: ICreateComment): Promise<Comment> {
  return await commentRepo.createComment(data);
}
