import { IWorkSpaceCategoriesRepo } from '../../../repos/workspace/categories/workSpaceCategories.repo';

export async function deleteWorkSpaceCategory(workSpaceCategory: IWorkSpaceCategoriesRepo, categoryId: string) {
  return await workSpaceCategory.delete(categoryId);
}
