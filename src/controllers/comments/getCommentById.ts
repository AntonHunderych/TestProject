import { ICommentsRepo } from '../../repos/comments/comments.repo';
import { Comment } from '../../types/entities/CommentSchema';

export async function getCommentById(commentsRepo: ICommentsRepo, commentId: string): Promise<Comment> {
  return await commentsRepo.getCommentById(commentId);
}
