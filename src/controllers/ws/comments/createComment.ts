import { IWorkSpaceCommentRepo } from '../../../repos/workspace/comments/workSpaceComments.repo';
import { WorkSpaceCommentEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceCommentEntity';

export async function createComment(
  workSpaceCommentRepo: IWorkSpaceCommentRepo,
  data: Partial<WorkSpaceCommentEntity>,
) {
  return await workSpaceCommentRepo.createComment(data);
}
