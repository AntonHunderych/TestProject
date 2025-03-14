import { ICommentsRepo } from '../../repos/comments/comments.repo';
import { IComment } from '../../db/schemas/CommentSchema';

export async function getTodoCommentsHandler(commentsRepo: ICommentsRepo, todoId: string): Promise<IComment[]> {
  return await commentsRepo.getAllTodoComments(todoId);
}
