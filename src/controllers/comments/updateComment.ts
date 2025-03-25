import { ICommentsRepo, IUpdateComment } from '../../repos/comments/comments.repo';
import { IComment } from '../../db/schemas/CommentSchema';

export async function updateComment(commentRepo: ICommentsRepo, id: string, data: IUpdateComment): Promise<IComment> {
  return await commentRepo.updateComment(id, data);
}
