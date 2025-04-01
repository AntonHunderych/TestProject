import { BasicCategorySchema } from '../BasicCategorySchema';
import { WorkSpaceSchema } from './WorkSpaceSchema';
import z from 'zod';
import { WorkSpaceTodoCategorySchema } from './WorkSpaceTodoCategorySchema';
import { WorkSpaceUserSchema } from './WorkSpaceUserSchema';

export const WorkSpaceCategorySchema: any = BasicCategorySchema.extend({
  todoCategory: z.array(WorkSpaceTodoCategorySchema).nullish(),
  creatorId: z.string(),
  creator: WorkSpaceUserSchema.nullish(),
  workSpaceId: z.string(),
  workSpace: WorkSpaceSchema.nullish(),
});
