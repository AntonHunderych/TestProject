import { ICommentsRepo, ICreateComment } from '../../repos/comments/comments.repo';
import { IComment } from '../../types/entities/CommentSchema';

export async function createComment(commentRepo: ICommentsRepo, data: ICreateComment): Promise<IComment> {
  return await commentRepo.createComment(data);
}
