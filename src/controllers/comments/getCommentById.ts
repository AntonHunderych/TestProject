import { ICommentsRepo } from '../../repos/comments/comments.repo';
import { IComment } from '../../db/schemas/CommentSchema';

export async function getCommentById(commentsRepo: ICommentsRepo, commentId: string): Promise<IComment> {
  return await commentsRepo.getCommentById(commentId);
}
