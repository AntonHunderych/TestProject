import { ITodosRepo } from '../../repos/todos/todos.repo';
import { Todo } from '../../types/entities/TodoSchema';

export async function getTodoById(todoRepo: ITodosRepo, todoId: string): Promise<Todo> {
  return todoRepo.findById(todoId);
}
