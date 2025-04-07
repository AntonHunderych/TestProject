import { IWorkSpaceCommentRepo } from '../../../repos/workspace/comments/workSpaceComments.repo';

export async function deleteComment(workSpaceCommentRepo: IWorkSpaceCommentRepo, commentId: string) {
  return await workSpaceCommentRepo.deleteComment(commentId);
}
