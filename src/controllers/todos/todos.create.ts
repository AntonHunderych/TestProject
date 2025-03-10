import { ITodosRepo } from '../../repos/todos/todos.repo';
import { ITodo } from '../../db/schemas/TodoSchema';

export interface ICreateTodosHandlerResp extends ITodo{}

export async function createTodosHandler(todoRepo: ITodosRepo,data: Omit<ITodo,"id">): Promise<ICreateTodosHandlerResp>{
  return await todoRepo.create(data)
}