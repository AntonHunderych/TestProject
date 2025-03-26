import { ICommentsRepo } from '../../repos/comments/comments.repo';
import { IComment } from '../../types/entities/CommentSchema';

export async function getCommentById(commentsRepo: ICommentsRepo, commentId: string): Promise<IComment> {
  return await commentsRepo.getCommentById(commentId);
}
