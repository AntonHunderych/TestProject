import { ICommentsRepo } from '../../repos/comments/comments.repo';
import { Comment } from '../../types/entities/CommentSchema';

export async function getAllComments(commentsRepo: ICommentsRepo): Promise<Comment[]> {
  return await commentsRepo.getAllComments();
}
