import { IComment } from '../../db/schemas/CommentSchema';
import { ICommentsRepo, ICreateComment } from '../../repos/comments/comments.repo';

export async function createCommentHandler(commentRepo: ICommentsRepo, data: ICreateComment): Promise<IComment> {
  return await commentRepo.createComment(data);
}
