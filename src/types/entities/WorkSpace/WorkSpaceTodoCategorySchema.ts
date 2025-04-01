import z from 'zod';
import { WorkSpaceTodoSchema } from './WorkSpaceTodoSchema';
import { WorkSpaceCategorySchema } from './WorkSpaceCategorySchema';

export const WorkSpaceTodoCategorySchema = z.object({
  todoId: z.string(),
  todo: WorkSpaceTodoSchema.nullish(),
  categoryId: z.string(),
  category: WorkSpaceCategorySchema.nullish(),
  attachedByUserId: z.string(),
  attachedData: z.date(),
});
