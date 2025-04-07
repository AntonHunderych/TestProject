import { IWorkSpaceCategoriesRepo } from '../../../repos/workspace/categories/workSpaceCategories.repo';

export async function updateWorkSpaceCategory(
  workSpaceCategory: IWorkSpaceCategoriesRepo,
  categoryId: string,
  value?: string,
  description?: string,
) {
  return await workSpaceCategory.update(categoryId, value, description);
}
