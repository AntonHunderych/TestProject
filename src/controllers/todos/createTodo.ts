import { ITodosRepo } from '../../repos/todos/todos.repo';
import { ITodo } from '../../types/entities/TodoSchema';

export async function createTodo(todoRepo: ITodosRepo, data: Omit<ITodo, 'id'>): Promise<ITodo> {
  return await todoRepo.create(data);
}
