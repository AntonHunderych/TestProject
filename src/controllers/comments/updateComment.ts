import { ICommentsRepo, IUpdateComment } from '../../repos/comments/comments.repo';
import { IComment } from '../../types/entities/CommentSchema';

export async function updateComment(commentRepo: ICommentsRepo, id: string, data: IUpdateComment): Promise<IComment> {
  return await commentRepo.updateComment(id, data);
}
