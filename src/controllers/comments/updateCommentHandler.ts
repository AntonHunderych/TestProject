import { ICommentsRepo, IUpdateComment } from '../../repos/comments/comments.repos';
import { IComment } from '../../db/schemas/CommentSchema';

export async function updateCommentHandler(
  commentRepo: ICommentsRepo,
  id: string,
  data: IUpdateComment,
): Promise<IComment> {
  return await commentRepo.updateComment(id, data);
}
