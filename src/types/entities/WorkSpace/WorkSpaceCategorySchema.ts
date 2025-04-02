import { BasicCategorySchema } from '../BasicCategorySchema';
import z from 'zod';

export const WorkSpaceCategorySchema = BasicCategorySchema.extend({
  creatorId: z.string(),
  workSpaceId: z.string(),
});
