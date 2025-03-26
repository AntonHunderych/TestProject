import { ICommentsRepo } from '../../repos/comments/comments.repo';
import { IComment } from '../../types/entities/CommentSchema';

export async function getAllComments(commentsRepo: ICommentsRepo): Promise<IComment[]> {
  return await commentsRepo.getAllComments();
}
