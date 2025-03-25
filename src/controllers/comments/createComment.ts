import { IComment } from '../../db/schemas/CommentSchema';
import { ICommentsRepo, ICreateComment } from '../../repos/comments/comments.repo';

export async function createComment(commentRepo: ICommentsRepo, data: ICreateComment): Promise<IComment> {
  return await commentRepo.createComment(data);
}
