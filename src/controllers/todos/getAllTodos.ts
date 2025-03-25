import { ITodosRepo } from '../../repos/todos/todos.repo';
import { ITodo } from '../../db/schemas/TodoSchema';

export async function getAllTodos(todoRepo: ITodosRepo): Promise<ITodo[]> {
  return todoRepo.findAll();
}
