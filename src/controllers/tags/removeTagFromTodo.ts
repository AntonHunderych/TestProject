import { ITodoTagRepo } from '../../repos/todoTag/todoTag.repo';

export async function removeTagFromTodo(todoTagRepo: ITodoTagRepo, tagId: string, todoId: string): Promise<void> {
  return await todoTagRepo.removeTag(todoId, tagId);
}
