import { ITagsRepo } from '../../repos/tags/tags.repo';

export async function removeTagFromTodo(tagRepo: ITagsRepo, tagId: string, todoId: string): Promise<void> {
  return await tagRepo.removeTag(todoId, tagId);
}
