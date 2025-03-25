import { ITodosRepo } from '../../repos/todos/todos.repo';
import { ITodo } from '../../db/schemas/TodoSchema';

export async function updateTodo(todoRepo: ITodosRepo, todoId: string, data: Partial<ITodo>): Promise<ITodo> {
  return await todoRepo.update(todoId, data);
}
