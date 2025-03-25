import { TodoSchemaResp } from '../../../todos/schemas/getTodoShema';

export const getWorkSpaceTodoSchema = TodoSchemaResp.omit({
  comments: true,
});
