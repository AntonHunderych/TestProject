import { ITagsRepo } from '../../repos/tags/tags.repo';

export async function addTagToTodo(tagRepo: ITagsRepo, tagId: string, todoId: string): Promise<void> {
  return await tagRepo.addTag(todoId, tagId);
}
