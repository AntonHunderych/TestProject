import { ICommentsRepo } from '../../repos/comments/comments.repo';
import { IComment } from '../../types/entities/CommentSchema';

export async function getTodoComments(commentsRepo: ICommentsRepo, todoId: string): Promise<IComment[]> {
  return await commentsRepo.getAllTodoComments(todoId);
}
