import { ICommentsRepo, IUpdateComment } from '../../repos/comments/comments.repo';
import { Comment } from '../../types/entities/CommentSchema';

export async function updateComment(commentRepo: ICommentsRepo, id: string, data: IUpdateComment): Promise<Comment> {
  return await commentRepo.updateComment(id, data);
}
