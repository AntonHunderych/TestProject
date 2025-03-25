import { ICommentsRepo } from '../../repos/comments/comments.repo';

export async function deleteComment(commentRepo: ICommentsRepo, id: string): Promise<boolean> {
  return await commentRepo.deleteComment(id);
}
