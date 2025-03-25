import { ICommentsRepo } from '../../repos/comments/comments.repo';
import { IComment } from '../../db/schemas/CommentSchema';

export async function getAllComments(commentsRepo: ICommentsRepo): Promise<IComment[]> {
  return await commentsRepo.getAllComments();
}
