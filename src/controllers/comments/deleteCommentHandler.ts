import { ICommentsRepo } from '../../repos/comments/comments.repos';

export async function deleteCommentHandler(commentRepo: ICommentsRepo, id: string): Promise<boolean> {
  return await commentRepo.deleteComment(id);
}
