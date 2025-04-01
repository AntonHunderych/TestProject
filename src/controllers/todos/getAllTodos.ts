import { ITodosRepo } from '../../repos/todos/todos.repo';
import { Todo } from '../../types/entities/TodoSchema';

export async function getAllTodos(todoRepo: ITodosRepo): Promise<Todo[]> {
  return todoRepo.findAll();
}
