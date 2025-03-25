import { ITodosRepo } from '../../repos/todos/todos.repo';

export async function deleteTodo(todoRepo: ITodosRepo, todoId: string): Promise<boolean> {
  return await todoRepo.delete(todoId);
}
