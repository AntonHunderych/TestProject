import { ITodosRepo } from '../../repos/todos/todos.repo';
import { Todo } from '../../types/entities/TodoSchema';

export async function updateTodo(todoRepo: ITodosRepo, todoId: string, data: Partial<Todo>): Promise<Todo> {
  return await todoRepo.update(todoId, data);
}
