import { ITodosRepo } from '../../repos/todos/todos.repo';
import { ITodo } from '../../db/schemas/TodoSchema';

export async function getTodoById(todoRepo: ITodosRepo, todoId: string): Promise<ITodo> {
  return todoRepo.findById(todoId);
}
