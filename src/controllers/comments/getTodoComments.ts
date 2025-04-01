import { ICommentsRepo } from '../../repos/comments/comments.repo';
import { Comment } from '../../types/entities/CommentSchema';

export async function getTodoComments(commentsRepo: ICommentsRepo, todoId: string): Promise<Comment[]> {
  return await commentsRepo.getAllTodoComments(todoId);
}
