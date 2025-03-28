import { getTodoSchema } from '../../../todos/schemas/getTodoShema';

export const getWorkSpaceTodoSchema = getTodoSchema.omit({
  comments: true,
});
