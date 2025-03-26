import { ITodoTagRepo } from '../../repos/todoTag/todoTag.repo';

export async function addTagToTodo(todoTagRepo: ITodoTagRepo, tagId: string, todoId: string): Promise<void> {
  return await todoTagRepo.addTag(todoId, tagId);
}
