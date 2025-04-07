import { IWorkSpaceCommentRepo } from '../../../repos/workspace/comments/workSpaceComments.repo';

export async function updateComment(workSpaceCommentRepo: IWorkSpaceCommentRepo, commentId: string, text: string) {
  return await workSpaceCommentRepo.updateComment(commentId, { text });
}
