import { DBError } from '../../types/errors/DBError';
import { DataSource } from 'typeorm';
import { TodoTag } from '../../services/typeorm/entities/TodoTagEntity';

export interface ITodoTagRepo {
  addTag(todoId: string, tagId: string): Promise<void>;
  removeTag(todoId: string, tagId: string): Promise<void>;
}

export function getTodoTagRepo(db: DataSource): ITodoTagRepo {
  const todoTagRepo = db.getRepository(TodoTag);

  return {
    async addTag(todoId: string, tagId: string): Promise<void> {
      try {
        await todoTagRepo.save({ todoId, tagId });
      } catch (error) {
        throw new DBError('Failed to add tag', error);
      }
    },
    async removeTag(todoId: string, tagId: string): Promise<void> {
      try {
        await todoTagRepo.delete({ todoId, tagId });
      } catch (error) {
        throw new DBError('Failed to remove tag', error);
      }
    },
  };
}
