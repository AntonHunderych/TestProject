import { ITodosRepo } from '../../repos/todos/todos.repo';
import { Todo } from '../../types/entities/TodoSchema';

export async function createTodo(todoRepo: ITodosRepo, data: Omit<Todo, 'id'>): Promise<Todo> {
  return await todoRepo.create(data);
}
