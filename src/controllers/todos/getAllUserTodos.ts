import { ITodo } from '../../db/schemas/TodoSchema';
import { ITodosRepo } from '../../repos/todos/todos.repo';

export async function getAllUserTodos(todosRepo: ITodosRepo, userID: string): Promise<ITodo[]>{
  return todosRepo.findByCreatorId(userID)
}