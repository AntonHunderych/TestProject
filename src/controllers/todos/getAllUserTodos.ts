import { ITodosRepo } from '../../repos/todos/todos.repo';
import { Todo } from '../../types/entities/TodoSchema';

export async function getAllUserTodos(todosRepo: ITodosRepo, userID: string): Promise<Todo[]> {
  return todosRepo.findByCreatorId(userID);
}
