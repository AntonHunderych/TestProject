import { ITodosRepo } from '../../repos/todos/todos.repo';
import { ITodo } from '../../types/entities/TodoSchema';

export async function getAllUserTodos(todosRepo: ITodosRepo, userID: string): Promise<ITodo[]> {
  return todosRepo.findByCreatorId(userID);
}
