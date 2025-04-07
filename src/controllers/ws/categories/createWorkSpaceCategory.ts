import { IWorkSpaceCategoriesRepo } from '../../../repos/workspace/categories/workSpaceCategories.repo';

export async function createWorkSpaceCategory(
  workSpaceCategory: IWorkSpaceCategoriesRepo,
  data: {
    workSpaceId: string;
    value: string;
    description?: string;
    creatorId: string;
  },
) {
  return await workSpaceCategory.create(data);
}
